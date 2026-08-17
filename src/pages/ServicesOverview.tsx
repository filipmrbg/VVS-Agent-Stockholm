import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import CTABanner from '../components/CTABanner';
import { usePageTitle } from '../hooks/usePageTitle';
import services, { ServiceItem } from '../data/services';

const container: React.CSSProperties = {
  maxWidth: 'var(--container-max)',
  margin: '0 auto',
  padding: '0 clamp(20px, 5vw, 40px)',
};

export default function ServicesOverview() {
  usePageTitle(
    'Våra Tjänster | VVS Agent Stockholm AB – Kompletta VVS-installationer',
    'Upptäck våra professionella VVS-tjänster i Stockholm: Värmepumpar, Badrum & Kök, Rörservice & Akut VVS och Vattenburen Golvvärme. Begär kostnadsfri offert!'
  );

  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const yOffset = -100;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [hash]);

  const scrollToSection = (slug: string) => {
    const element = document.getElementById(slug);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      window.history.pushState(null, '', `#${slug}`);
    }
  };

  return (
    <main style={{ fontFamily: 'var(--font-family)', background: '#ffffff' }}>

      {/* ── HERO HEADER ──────────── */}
      <section style={{
        position: 'relative',
        backgroundImage: 'url(https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1400)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: '130px',
        paddingBottom: '40px',
        textAlign: 'center',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(7, 19, 30, 0.85)' }} />

        <div style={{ ...container, position: 'relative', zIndex: 1 }}>
          <ScrollReveal animation="blur-in">
            <h1 style={{
              color: 'var(--color-white)',
              fontWeight: 800,
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              margin: '0 0 16px 0',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}>
              Våra VVS-tjänster
            </h1>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={150}>
            <p style={{
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: '1.08rem',
              maxWidth: '640px',
              margin: '0 auto',
              lineHeight: 1.65,
            }}>
              Kompletta och fackmannamässiga VVS-installationer för både privatpersoner och fastighetsägare – alltid med fasta priser och 30% ROT-avdrag.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── STICKY ANCHOR TAB BAR ──────────────────────────── */}
      <div style={{
        position: 'sticky',
        top: '72px',
        zIndex: 40,
        background: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e2e8f0',
        padding: '10px 0',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
      }}>
        <div style={container}>
          <div
            className="services-tab-bar"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              padding: '4px 0',
            }}
          >
            {services.map((svc) => (
              <button
                key={svc.slug}
                onClick={() => scrollToSection(svc.slug)}
                style={{
                  background: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  borderRadius: '4px',
                  padding: '9px 18px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: 'var(--text-dark)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'var(--font-heading)',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--primary)';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f1f5f9';
                  e.currentTarget.style.color = 'var(--text-dark)';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                {svc.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── DETAILED SERVICE SECTIONS (ALTERNATING LAYOUT) ──────────── */}
      <div style={{ padding: '20px 0 80px 0' }}>
        {services.map((svc: ServiceItem, index: number) => {
          const isEven = index % 2 === 0;

          return (
            <section
              key={svc.slug}
              id={svc.slug}
              style={{
                padding: 'clamp(50px, 8vw, 80px) 0',
                background: isEven ? '#ffffff' : '#f8fafc',
                borderBottom: '1px solid #e2e8f0',
              }}
            >
              <div style={container}>
                <div
                  className={`service-detail-grid ${isEven ? 'layout-normal' : 'layout-reversed'}`}
                >
                  {/* Image Column */}
                  <div className="service-image-col">
                    <ScrollReveal animation={isEven ? 'fade-right' : 'fade-left'}>
                      <div style={{
                        position: 'relative',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        boxShadow: '0 16px 36px rgba(0, 0, 0, 0.1)',
                        border: '1px solid #e2e8f0',
                        aspectRatio: '4/3',
                        background: '#07131e',
                      }}>
                        <img
                          src={svc.image}
                          alt={svc.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                        />
                      </div>
                    </ScrollReveal>
                  </div>

                  {/* Content Column */}
                  <div className="service-content-col">
                    <ScrollReveal animation={isEven ? 'fade-left' : 'fade-right'}>
                      <span style={{
                        color: 'var(--primary)',
                        fontWeight: 700,
                        fontSize: '0.84rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        display: 'block',
                        marginBottom: '8px',
                      }}>
                        {svc.tag || 'VVS-Tjänst'}
                      </span>
                      <h2 style={{
                        color: 'var(--text-dark)',
                        fontWeight: 800,
                        fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)',
                        letterSpacing: '-0.02em',
                        margin: '0 0 16px 0',
                        lineHeight: 1.2,
                        fontFamily: 'var(--font-heading)',
                      }}>
                        {svc.title}
                      </h2>
                      <p style={{
                        color: 'var(--color-gray-600)',
                        fontSize: '0.96rem',
                        lineHeight: 1.75,
                        margin: '0 0 24px 0',
                        whiteSpace: 'pre-line',
                      }}>
                        {svc.detailedDescription}
                      </p>

                      {/* Action Button */}
                      <Link
                        to="/offert"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          background: 'var(--primary)',
                          color: '#ffffff',
                          fontWeight: 700,
                          fontSize: '0.92rem',
                          padding: '12px 24px',
                          borderRadius: '4px',
                          textDecoration: 'none',
                          boxShadow: '0 4px 14px rgba(175, 115, 73, 0.3)',
                          transition: 'all 0.25s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--color-primary-hover, #925c38)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'var(--primary)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <span>Begär offert för {svc.title}</span>
                        <ArrowRight size={16} />
                      </Link>
                    </ScrollReveal>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ── CTA BANNER ────────────────────────────────────────── */}
      <CTABanner />

      <style>{`
        .services-tab-bar::-webkit-scrollbar {
          display: none;
        }
        .services-tab-bar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .service-detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          alignItems: center;
        }
        .service-detail-grid.layout-reversed .service-image-col {
          order: 2;
        }
        .service-detail-grid.layout-reversed .service-content-col {
          order: 1;
        }
        @media (max-width: 900px) {
          .service-detail-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .service-detail-grid.layout-reversed .service-image-col,
          .service-detail-grid.layout-normal .service-image-col {
            order: 1 !important;
          }
          .service-detail-grid.layout-reversed .service-content-col,
          .service-detail-grid.layout-normal .service-content-col {
            order: 2 !important;
          }
          .services-tab-bar {
            justify-content: flex-start !important;
            padding-left: 4px !important;
          }
        }
      `}</style>
    </main>
  );
}
