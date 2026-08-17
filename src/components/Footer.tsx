import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, ShieldCheck, ArrowUpRight } from 'lucide-react';

const serviceLinks = [
  { label: 'Värmepumpar & Värmesystem', href: '/tjanster#varmepumpar' },
  { label: 'Badrum & Kök', href: '/tjanster#badrum-kok' },
  { label: 'Rörservice & Akut VVS', href: '/tjanster#rorservice' },
  { label: 'Vattenburen Golvvärme', href: '/tjanster#golvvarme' },
  { label: 'Fastighetsservice & Underhåll', href: '/tjanster' },
];

const navigationLinks = [
  { label: 'Start', href: '/' },
  { label: 'Våra Tjänster', href: '/tjanster' },
  { label: 'Om Oss', href: '/om-oss' },
  { label: 'Begär Offert', href: '/offert' },
  { label: 'Kontakt & Jour', href: '/kontakt' },
];

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogoClick(e: React.MouseEvent) {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }

  return (
    <footer
      style={{
        background: '#040b12',
        color: '#ffffff',
        fontFamily: 'var(--font-body)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          padding: '70px clamp(20px, 5vw, 40px) 30px',
        }}
      >
        {/* Huvudsektion med 3 balanserade kolumner */}
        <div
          className="footer-grid-container"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
            gap: '40px',
            paddingBottom: '50px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Kolumn 1: Logotyp & Företagsinformation */}
          <div>
            <div style={{ marginBottom: '20px' }}>
              <Link
                to="/"
                onClick={handleLogoClick}
                style={{ textDecoration: 'none', display: 'inline-block', cursor: 'pointer' }}
              >
                <img
                  src="/logo-white.png"
                  alt="VVS AGENT STOCKHOLM AB"
                  style={{
                    height: '44px',
                    width: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </Link>
            </div>
            <p
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.92rem',
                lineHeight: 1.65,
                margin: '0 0 20px 0',
                maxWidth: '340px',
              }}
            >
              Komplett VVS-företag i Stockholm. Vi utför badrum, kök, värmesystem, rörarbeten och professionell fastighetsservice i hela Stockholm med 30% ROT-avdrag.
            </p>
            <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.5)' }}>
              Org.nr: 559368-1066 • Innehar F-skatt
            </div>
          </div>

          {/* Kolumn 2: Tjänster */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                color: '#ffffff',
                fontSize: '1.05rem',
                margin: '0 0 20px 0',
                letterSpacing: '-0.01em',
              }}
            >
              VVS-tjänster
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      textDecoration: 'none',
                      fontSize: '0.92rem',
                      display: 'inline-block',
                      transition: 'color 0.2s ease, transform 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--primary)';
                      e.currentTarget.style.transform = 'translateX(3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolumn 3: Navigation */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                color: '#ffffff',
                fontSize: '1.05rem',
                margin: '0 0 20px 0',
                letterSpacing: '-0.01em',
              }}
            >
              Snabblänkar
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      textDecoration: 'none',
                      fontSize: '0.92rem',
                      display: 'inline-block',
                      transition: 'color 0.2s ease, transform 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--primary)';
                      e.currentTarget.style.transform = 'translateX(3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolumn 4: Kontaktuppgifter */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                color: '#ffffff',
                fontSize: '1.05rem',
                margin: '0 0 20px 0',
                letterSpacing: '-0.01em',
              }}
            >
              Kontakt & Jour
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Telefon */}
              <a
                href="tel:+46735000250"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '0.94rem',
                  fontWeight: 600,
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '4px',
                    background: 'rgba(175, 115, 73, 0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: 'var(--primary)',
                  }}
                >
                  <Phone size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Telefon
                  </div>
                  <div>073-500 02 50</div>
                </div>
              </a>

              {/* E-post */}
              <a
                href="mailto:info@vvsagent.se"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '0.94rem',
                  fontWeight: 600,
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '4px',
                    background: 'rgba(175, 115, 73, 0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: 'var(--primary)',
                  }}
                >
                  <Mail size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    E-post
                  </div>
                  <div>info@vvsagent.se</div>
                </div>
              </a>

              {/* Område */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '0.94rem',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '4px',
                    background: 'rgba(175, 115, 73, 0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: 'var(--primary)',
                  }}
                >
                  <MapPin size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Område
                  </div>
                  <div>Stockholm med omnejd</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottenrad */}
        <div
          style={{
            paddingTop: '25px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.85rem',
            color: 'rgba(255, 255, 255, 0.45)',
          }}
        >
          <div>
            © {new Date().getFullYear()} VVS AGENT STOCKHOLM AB. Alla rättigheter förbehållna.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span>Fackmannamässigt utförda VVS-arbeten</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.6)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: 0,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')}
            >
              <span>Till toppen</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-grid-container {
            grid-template-columns: 1fr 1fr !important;
            gap: 36px !important;
          }
        }
        @media (max-width: 640px) {
          .footer-grid-container {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
            text-align: left;
          }
        }
      `}</style>
    </footer>
  );
}
