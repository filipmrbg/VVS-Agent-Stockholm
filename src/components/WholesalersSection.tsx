import React from 'react';
import ScrollReveal from './ScrollReveal';

interface WholesalersSectionProps {
  className?: string;
  dark?: boolean;
}

const wholesalers = [
  {
    name: 'Dahl',
    logo: '/images/partners/dahl.png',
    height: 38,
  },
  {
    name: 'Ahlsell',
    logo: '/images/partners/ahlsell.png',
    height: 42,
  },
  {
    name: 'Lundagrossisten',
    logo: '/images/partners/lundagrossisten.png',
    height: 34,
  },
];

export default function WholesalersSection({ className = '', dark = false }: WholesalersSectionProps) {
  const containerStyle: React.CSSProperties = {
    maxWidth: 'var(--container-max, 1240px)',
    margin: '0 auto',
    padding: '0 clamp(20px, 5vw, 40px)',
  };

  return (
    <section
      id="grossister"
      className={className}
      style={{
        background: dark ? 'transparent' : '#ffffff',
        padding: 'clamp(40px, 5vw, 60px) 0',
        position: 'relative',
      }}
    >
      <div style={containerStyle}>
        {/* Säker Vatten Auktorisation Banner */}
        <ScrollReveal animation="fade-up">
          <div
            style={{
              maxWidth: '860px',
              margin: '0 auto clamp(36px, 5vw, 48px) auto',
              padding: 'clamp(20px, 3vw, 26px) clamp(20px, 3.5vw, 32px)',
              background: dark ? 'rgba(255, 255, 255, 0.05)' : '#f8fafc',
              border: `1px solid ${dark ? 'rgba(255, 255, 255, 0.12)' : '#e2e8f0'}`,
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              boxShadow: dark ? 'none' : '0 4px 20px rgba(0, 0, 0, 0.03)',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: '1 1 340px' }}>
              <img
                src="/images/saker-vatten.webp"
                alt="Auktoriserat VVS-företag Säker Vatten"
                style={{
                  height: '70px',
                  width: '70px',
                  objectFit: 'contain',
                  flexShrink: 0,
                }}
              />
              <div>
                <div style={{
                  color: 'var(--primary, #af7349)',
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '4px',
                }}>
                  Certifierad trygghet
                </div>
                <h3 style={{
                  margin: '0 0 6px 0',
                  color: dark ? '#ffffff' : '#0f172a',
                  fontFamily: 'var(--font-heading, Outfit, sans-serif)',
                  fontWeight: 800,
                  fontSize: 'clamp(1.15rem, 2vw, 1.35rem)',
                  lineHeight: 1.25,
                }}>
                  Auktoriserat VVS-företag enligt Säker Vatten
                </h3>
                <p style={{
                  margin: 0,
                  color: dark ? 'rgba(255, 255, 255, 0.75)' : '#475569',
                  fontSize: '0.9rem',
                  lineHeight: 1.55,
                }}>
                  Vi arbetar enligt Branschregler Säker Vatteninstallation. Det innebär godkända metoder, fackmannamässigt utförande och fullt godkännande hos försäkringsbolag.
                </p>
              </div>
            </div>
            <a
              href="https://sakervatten.se"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Läs mer om Säker Vatten (öppnas i ny flik)"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '4px',
                background: dark ? 'rgba(255, 255, 255, 0.1)' : '#ffffff',
                border: `1px solid ${dark ? 'rgba(255, 255, 255, 0.2)' : '#cbd5e1'}`,
                color: dark ? '#ffffff' : '#0f172a',
                fontSize: '0.88rem',
                fontWeight: 600,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary, #af7349)';
                e.currentTarget.style.color = 'var(--primary, #af7349)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = dark ? 'rgba(255, 255, 255, 0.2)' : '#cbd5e1';
                e.currentTarget.style.color = dark ? '#ffffff' : '#0f172a';
              }}
            >
              Läs mer på Säker Vatten
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={100}>
          {/* Rubrik */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(24px, 3.5vw, 36px)' }}>
            <h2
              style={{
                color: dark ? 'rgba(255, 255, 255, 0.9)' : '#111827',
                fontFamily: 'var(--font-heading, Outfit, sans-serif)',
                fontWeight: 800,
                fontSize: 'clamp(1.4rem, 2.4vw, 1.9rem)',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              Kvalitetsmaterial från ledande grossister
            </h2>
          </div>

          {/* Sömlös rad med logotyper som smälter in helt utan kort */}
          <div className="wholesalers-seamless-row">
            {wholesalers.map((wholesaler) => (
              <div key={wholesaler.name} className="wholesaler-logo-item">
                <img
                  src={wholesaler.logo}
                  alt={`${wholesaler.name} logotyp`}
                  style={{
                    height: `${wholesaler.height}px`,
                    width: 'auto',
                    maxWidth: '180px',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        .wholesalers-seamless-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(32px, 6vw, 72px);
          flex-wrap: wrap;
        }

        .wholesaler-logo-item {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px 12px;
          opacity: 0.88;
          transition: opacity 0.25s ease, transform 0.25s ease;
        }

        .wholesaler-logo-item:hover {
          opacity: 1;
          transform: translateY(-2px);
        }

        @media (max-width: 640px) {
          .wholesalers-seamless-row {
            gap: 24px 36px;
          }
          .wholesaler-logo-item img {
            max-height: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
