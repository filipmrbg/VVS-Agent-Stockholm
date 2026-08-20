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
        <ScrollReveal animation="fade-up">
          {/* Rubrik */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(24px, 3.5vw, 36px)' }}>
            <h2
              style={{
                color: dark ? 'rgba(255, 255, 255, 0.9)' : '#111827',
                fontFamily: 'var(--font-heading, Outfit, sans-serif)',
                fontWeight: 800,
                fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              Grossister vi handlar hos
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
