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
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e2e8f0',
        padding: '12px 0',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
      }}>
        <div style={container}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}>
            {services.map((svc) => (
              <button
                key={svc.slug}
                onClick={() => scrollToSection(svc.slug)}
                style={{
                  background: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  borderRadius: '4px',
                  padding: '10px 20px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: 'var(--text-dark)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'var(--font-heading)',
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
      <div style={{ padding: '60px 0 100px 0' }}>
        {services.map((svc: ServiceItem, index: number) => {
          const isEven = index % 2 === 0;

          return (
            <section
              key={svc.slug}
              id={svc.slug}
              style={{
                padding: '80px 0',
                background: isEven ? '#ffffff' : '#f8fafc',
                borderBottom: '1px solid #e2e8f0',
              }}
            >
              <div style={container}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '50px',
                  alignItems: 'center',
                }}>

                  {/* Image Column */}
                  <div style={{ order: isEven ? 1 : 2 }}>
                    <ScrollReveal animation={isEven ? 'fade-right' : 'fade-left'}>
                      <div style={{
                        position: 'relative',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px rgba(15, 23, 42, 0.12)',
                        border: '3px solid #ffffff',
                        aspectRatio: '4/3',
                        background: '#0f172a',
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
                  <div style={{ order: isEven ? 2 : 1 }}>
                    <ScrollReveal animation={isEven ? 'fade-left' : 'fade-right'}>
                      <h2 style={{
                        color: 'var(--color-text-dark)',
                        fontWeight: 800,
                        fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                        letterSpacing: '-0.03em',
                        margin: '0 0 16px 0',
                        lineHeight: 1.2,
                      }}>
                        {svc.title}
                      </h2>
                      <p style={{
                        color: 'var(--color-gray-600)',
                        fontSize: '1.02rem',
                        lineHeight: 1.75,
                        margin: '0 0 28px 0',
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
                          gap: '10px',
                          background: 'var(--color-primary)',
                          color: '#ffffff',
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          padding: '14px 28px',
                          borderRadius: 'var(--border-radius-pill)',
                          textDecoration: 'none',
                          boxShadow: '0 4px 14px rgba(234, 88, 12, 0.35)',
                          transition: 'all 0.25s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--color-primary-hover)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'var(--color-primary)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        Begär offert för {svc.title} <ArrowRight size={16} />
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

    </main>
  );
}
