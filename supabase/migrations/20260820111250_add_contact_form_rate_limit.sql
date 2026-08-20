/*
  # Durable rate limiting for the public contact form

  The contact/quote email endpoint is intentionally unauthenticated, so its only
  abuse control is volume. That control previously lived in the edge function's
  process memory, which is lost on isolate recycling and is not shared between
  concurrently running instances, and it relied on a low global counter that any
  caller could fill in order to deny service to everyone else.

  This migration moves the per-sender window into the database so it survives
  restarts and is shared across instances.

  1. New table
     - `contact_rate_limit`
       - `ip_hash` (text, primary key) - SHA-256 of the caller IP, so no raw
         visitor address is ever stored
       - `window_start` (timestamptz) - start of the current counting window
       - `request_count` (integer) - sends recorded inside that window
       - `updated_at` (timestamptz)

  2. Security
     - RLS is enabled with NO policies, so neither `anon` nor `authenticated`
       can read or write it through the Data API even though they hold table
       grants by default. All privileges are revoked from those roles as well.
     - `claim_contact_send` is SECURITY DEFINER with a pinned `search_path` and
       EXECUTE granted ONLY to `service_role`, so it is unreachable from the
       browser and callable solely by the edge function's server-side key.
     - The claim is atomic: a single INSERT ... ON CONFLICT statement both
       records the attempt and returns whether the allowance was already spent,
       so two concurrent callers cannot both pass the check.
*/

CREATE TABLE IF NOT EXISTS contact_rate_limit (
  ip_hash text PRIMARY KEY,
  window_start timestamptz NOT NULL DEFAULT now(),
  request_count integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_rate_limit ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE contact_rate_limit FROM anon;
REVOKE ALL ON TABLE contact_rate_limit FROM authenticated;

CREATE INDEX IF NOT EXISTS contact_rate_limit_window_start_idx
  ON contact_rate_limit (window_start);

/*
  Records one send for `p_ip_hash` and reports whether it is allowed.
  Returns true when the caller may send, false when the window is exhausted.
*/
CREATE OR REPLACE FUNCTION claim_contact_send(
  p_ip_hash text,
  p_max_per_window integer DEFAULT 5,
  p_window interval DEFAULT interval '1 hour'
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_count integer;
BEGIN
  IF p_ip_hash IS NULL OR length(trim(p_ip_hash)) = 0 THEN
    RETURN false;
  END IF;

  INSERT INTO contact_rate_limit AS c (ip_hash, window_start, request_count, updated_at)
  VALUES (p_ip_hash, now(), 1, now())
  ON CONFLICT (ip_hash) DO UPDATE
    SET
      window_start = CASE
        WHEN now() - c.window_start >= p_window THEN now()
        ELSE c.window_start
      END,
      request_count = CASE
        WHEN now() - c.window_start >= p_window THEN 1
        ELSE c.request_count + 1
      END,
      updated_at = now()
  RETURNING c.request_count INTO v_count;

  RETURN v_count <= p_max_per_window;
END;
$$;

REVOKE ALL ON FUNCTION claim_contact_send(text, integer, interval) FROM PUBLIC;
REVOKE ALL ON FUNCTION claim_contact_send(text, integer, interval) FROM anon;
REVOKE ALL ON FUNCTION claim_contact_send(text, integer, interval) FROM authenticated;
GRANT EXECUTE ON FUNCTION claim_contact_send(text, integer, interval) TO service_role;
