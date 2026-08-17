import { ShieldCheck, Award, Zap, Clock, Wrench, Play } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import Button from '../components/Button';
import CTABanner from '../components/CTABanner';
import { usePageTitle } from '../hooks/usePageTitle';

const container: React.CSSProperties = {
  maxWidth: 'var(--container-max)',
  margin: '0 auto',
  padding: '0 clamp(20px, 5vw, 40px)',
};

const teamMembers = [
  {
    name: 'Farid Alizadeh',
    role: 'Grundare & VD / Auktoriserad VVS-montör',
    initial: 'F',
    desc: 'Över 15 års erfarenhet av VVS, värmesystem och projektledning. Ansvarar för kundrelationer, projektering och kvalitetskontroll.',
  },
  {
    name: 'Elias Lindström',
    role: 'Erfaren VVS-montör & Värmetekniker',
    initial: 'E',
    desc: 'Specialist på värmepumpsinstallationer, stamdragningar och fackmannamässiga rörarbeten.',
  },
  {
    name: 'Marcus Berg',
    role: 'Behörig VVS- & Servicemontör',
    initial: 'M',
    desc: 'Expert på badrums-VVS, köksinstallationer, felsökning och snabb service för fastigheter och privatpersoner.',
  },
];

export default function About() {
  usePageTitle(
    'Om oss | VVS Agent Stockholm AB – Specialister inom VVS & Fastighetsservice',
    'Läs om VVS Agent Stockholm AB. Vi erbjuder trygg VVS-service med full ansvarsförsäkring, fasta priser och personlig service i hela Stockholm.'
  );

  return (
    <main style={{ fontFamily: 'var(--font-family)', background: '#ffffff' }}>

      {/* ── SECTION A: HERO HEADER ────────────────────────────── */}
      <section style={{
        position: 'relative',
        backgroundImage: 'url(/about-hero-bg.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: '140px',
        paddingBottom: '70px',
        textAlign: 'center',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(7, 19, 30, 0.7) 0%, rgba(7, 19, 30, 0.85) 100%)' }} />
        <div style={{ ...container, position: 'relative', zIndex: 1 }}>
          <div>
            <ScrollReveal animation="blur-in">
              <h1 style={{
                color: 'var(--color-white)',
                fontWeight: 800,
                fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
                margin: '0 0 16px 0',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
              }}>
                Om VVS Agent Stockholm
              </h1>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={150}>
              <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '1.08rem', margin: '0 auto', maxWidth: '640px', lineHeight: 1.65 }}>
                Specialister inom VVS och fastighetsservice med fokus på fackmannamässighet, moderna värmesystem och långsiktig trygghet.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── SECTION C: ABOUT STORY & VIDEO SHOWCASE ─────────────── */}
      <section style={{ background: '#ffffff', padding: '90px 0' }}>
        <div style={{ ...container, maxWidth: '1100px' }}>
          <div className="about-content-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '50px',
            alignItems: 'center',
          }}>

            {/* Left: Video Showcase */}
            <ScrollReveal animation="fade-right">
              <div style={{
                position: 'relative',
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                background: '#07131e',
                border: '1px solid #e2e8f0',
                height: '460px',
              }}>
                <video
                  src="/about-video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                  background: 'rgba(7, 19, 30, 0.9)',
                  backdropFilter: 'blur(8px)',
                  padding: '16px 20px',
                  borderRadius: '4px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}>
                  <div style={{ color: '#ffffff', fontWeight: 800, fontSize: '0.95rem', textTransform: 'uppercase' }}>
                    VVS AGENT STOCKHOLM
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.82rem' }}>
                    Specialister inom VVS & Fastighetsservice i Stockholm
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Text content */}
            <div>
              <ScrollReveal animation="blur-in">
                <h2 style={{
                  color: 'var(--color-text-dark)',
                  fontWeight: 800,
                  fontSize: 'clamp(2rem, 3.4vw, 2.7rem)',
                  lineHeight: 1.18,
                  letterSpacing: '-0.03em',
                  margin: '0 0 20px 0',
                }}>
                  Trygg VVS-service med yrkesstolthet
                </h2>
              </ScrollReveal>
              <ScrollReveal animation="fade-up" delay={100}>
                <div>
                  <p style={{
                    color: 'var(--color-gray-600)',
                    fontSize: '1.02rem',
                    lineHeight: 1.8,
                    margin: '0 0 18px 0',
                    fontWeight: 500,
                  }}>
                    VVS AGENT STOCKHOLM AB grundades med en tydlig vision: att erbjuda stockholmarna en transparent, auktoriserad och personlig VVS-partner för både akuta insatser och planerade helhetsrenoveringar.
                  </p>
                  
                  <p style={{
                    color: 'var(--color-gray-600)',
                    fontSize: '0.96rem',
                    lineHeight: 1.8,
                    margin: '0 0 20px 0',
                  }}>
                    Oavsett om det gäller byte av köks- och badrumsblandare, installation av energieffektiva värmesystem eller löpande fastighetsservice arbetar vi alltid fackmannamässigt enligt gällande branschregler och med fulla garantier.
                  </p>

                  {/* Founder Quote Card */}
                  <div style={{
                    background: 'rgba(175, 115, 73, 0.08)',
                    borderLeft: '4px solid var(--color-primary)',
                    padding: '20px 24px',
                    borderRadius: '0 4px 4px 0',
                    margin: '24px 0 28px 0',
                  }}>
                    <p style={{
                      color: 'var(--color-text-dark)',
                      fontSize: '1rem',
                      fontStyle: 'italic',
                      fontWeight: 500,
                      lineHeight: 1.65,
                      margin: '0 0 8px 0',
                    }}>
                      "Vårt mål är att varje kund ska känna 100% trygghet. Vi lämnar inget åt slumpen – rätt material, rätt kopplingar och alltid personlig service från start till mål."
                    </p>
                    <span style={{
                      color: 'var(--color-primary)',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      display: 'block',
                    }}>
                      Farid Alizadeh, Grundare & VD – VVS Agent Stockholm AB
                    </span>
                  </div>

                  <Button variant="primary" size="lg" href="/kontakt">
                    Kontakta oss för rådgivning & offert
                  </Button>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION D: TEAM PROFILES (3 PERSONS PER RULE 4) ───── */}
      <section style={{ background: '#f8fafc', padding: '90px 0', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 40px)' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <ScrollReveal animation="blur-in">
              <h2 style={{
                color: 'var(--color-text-dark)',
                fontWeight: 800,
                fontSize: 'clamp(2rem, 3.4vw, 2.6rem)',
                letterSpacing: '-0.03em',
                margin: '0 0 12px 0',
              }}>
                Auktoriserade VVS-experter
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={100}>
              <p style={{
                color: 'var(--color-gray-600)',
                fontSize: '1rem',
                lineHeight: 1.7,
                maxWidth: '600px',
                margin: '0 auto',
              }}>
                Med gedigen yrkeserfarenhet och behörigheter garanterar vi högsta kvalitet och personligt engagemang i varje projekt.
              </p>
            </ScrollReveal>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '28px',
          }}>
            {teamMembers.map((member, i) => (
              <ScrollReveal key={i} animation="slide-up-fade" delay={i * 100}>
                <div style={{
                  background: '#ffffff',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <div style={{ padding: '36px 28px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '4px',
                      background: 'rgba(175, 115, 73, 0.15)',
                      color: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.8rem',
                      fontWeight: 800,
                      margin: '0 auto 18px auto',
                    }}>
                      {member.initial}
                    </div>
                    <h3 style={{
                      color: 'var(--color-text-dark)',
                      fontWeight: 800,
                      fontSize: '1.25rem',
                      margin: '0 0 6px 0',
                    }}>
                      {member.name}
                    </h3>
                    <p style={{
                      color: 'var(--color-primary)',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      margin: '0 0 14px 0',
                      lineHeight: 1.4,
                    }}>
                      {member.role}
                    </p>
                    <p style={{
                      color: 'var(--color-gray-600)',
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      margin: 0,
                    }}>
                      {member.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION E: CTA BANNER ─────────────────────────────── */}
      <CTABanner
        heading="Behöver du professionell VVS-hjälp i Stockholm?"
        checkItems={[
          'Fackmannamässigt utförda VVS-installationer',
          'Värmepumpar, badrum & fastighetsservice',
          '10 MSEK ansvarsförsäkring & 30% ROT-avdrag direkt',
        ]}
      />

      <style>{`
        @media (max-width: 768px) {
          .about-content-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </main>
  );
}

