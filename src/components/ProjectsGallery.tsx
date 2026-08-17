import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, Instagram, ExternalLink } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import Button from './Button';

interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  tag: string;
}

const instagramPosts: InstagramPost[] = [
  {
    id: '1',
    image: '/gallery-1.jpg',
    caption: 'Kopparrörsdragning, shuntgrupp och tryckprovning i badrumsprojekt i Stockholm. Fackmannamässigt utfört med högsta precision! 🔧🚰',
    tag: '#badrum #vvsstockholm #badrumsrenovering',
  },
  {
    id: '2',
    image: '/gallery-4.jpg',
    caption: 'Komplett badrums-VVS med dolda rör, vägghängd fixtur och moderna blandare. Precision i varje detalj! 🚿✨',
    tag: '#badrumsrenovering #kök #vvsagent',
  },
  {
    id: '3',
    image: '/images/service_varmepumpar.jpg',
    caption: 'Installation och injustering av energieffektivt värmesystem för lägsta möjliga driftkostnad. 🔥⚡',
    tag: '#värmesystem #fastighetsservice',
  },
  {
    id: '4',
    image: '/images/service_reparation.jpg',
    caption: 'Rörservice, felsökning och reparation av vattenledningar och ventiler i fastighet i Stockholm. 🛠️',
    tag: '#rörservice #fastighetsservice #stockholm',
  },
];

export default function ProjectsGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const total = instagramPosts.length;

  const handlePrev = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? 0 : (prev - 1 + total) % total));
  }, [total]);

  const handleNext = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % total));
  }, [total]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = origOverflow;
    };
  }, [lightboxIndex, handlePrev, handleNext]);

  return (
    <section
      id="projekt"
      style={{
        background: 'var(--light-alt, #f4f4f4)',
        padding: 'clamp(70px, 9vw, 110px) 0',
        position: 'relative',
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          padding: '0 clamp(20px, 5vw, 40px)',
        }}
      >
        {/* Header */}
        <div style={{
          textAlign: 'center',
          maxWidth: '680px',
          margin: '0 auto 48px auto',
        }}>
          <ScrollReveal animation="fade-up">
            <h2
              style={{
                color: 'var(--text-dark)',
                fontWeight: 800,
                fontSize: 'clamp(2rem, 3.6vw, 2.7rem)',
                letterSpacing: '-0.02em',
                margin: '0 0 14px 0',
                lineHeight: 1.2,
              }}
            >
              Senaste uppdateringarna
            </h2>
            <p
              style={{
                color: 'var(--color-gray-600)',
                fontSize: '1rem',
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              Följ med bakom kulisserna och se våra pågående projekt och vardagen som rörmokare.
            </p>
          </ScrollReveal>
        </div>

        {/* 4-kolumners grid med Instagram-kort */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            marginBottom: '44px',
          }}
          className="insta-grid"
        >
          {instagramPosts.map((post, idx) => (
            <ScrollReveal key={post.id} animation="fade-up" delay={idx * 80}>
              <div
                onClick={() => setLightboxIndex(idx)}
                style={{
                  background: '#ffffff',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
                  cursor: 'pointer',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  border: '1px solid #e5e7eb',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 14px 30px rgba(0, 0, 0, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.05)';
                }}
              >
                {/* Photo with hover overlay */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '240px',
                  overflow: 'hidden',
                  background: '#07131e',
                }}>
                  <img
                    src={post.image}
                    alt={post.caption}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.4s ease',
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'rgba(0,0,0,0.65)',
                    color: '#ffffff',
                    padding: '6px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Instagram size={16} />
                  </div>
                </div>

                {/* Caption text */}
                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span style={{
                    color: 'var(--primary)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    marginBottom: '6px',
                    display: 'block',
                  }}>
                    {post.tag}
                  </span>
                  <p style={{
                    color: 'var(--text-dark)',
                    fontSize: '0.88rem',
                    lineHeight: 1.55,
                    margin: 0,
                    flex: 1,
                  }}>
                    {post.caption}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Knappar längst ner: "Följ oss på Instagram" */}
        <div style={{ textAlign: 'center' }}>
          <ScrollReveal animation="fade-up" delay={200}>
            <Button
              variant="primary"
              size="lg"
              href="https://www.instagram.com/vvsagent/"
            >
              <Instagram size={18} />
              Följ oss på Instagram
            </Button>
          </ScrollReveal>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null &&
        createPortal(
          <div
            className="lightbox-overlay"
            onClick={() => setLightboxIndex(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.92)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.15)',
                border: 'none',
                color: '#fff',
                width: '44px',
                height: '44px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              aria-label="Stäng bildvisare"
            >
              <X size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.15)',
                border: 'none',
                color: '#fff',
                width: '48px',
                height: '48px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              aria-label="Föregående bild"
            >
              <ChevronLeft size={28} />
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '650px',
                background: '#ffffff',
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              }}
            >
              <img
                src={instagramPosts[lightboxIndex].image}
                alt={instagramPosts[lightboxIndex].caption}
                style={{
                  width: '100%',
                  maxHeight: '65vh',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div style={{ padding: '24px', background: '#ffffff' }}>
                <span style={{ color: 'var(--primary)', fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                  {instagramPosts[lightboxIndex].tag}
                </span>
                <p style={{ color: 'var(--text-dark)', fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                  {instagramPosts[lightboxIndex].caption}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '14px' }}>
                  <span style={{ fontSize: '0.85rem', color: '#888' }}>
                    Bild {lightboxIndex + 1} av {total}
                  </span>
                  <a
                    href="https://www.instagram.com/vvsagent/"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: 'var(--primary)',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      textDecoration: 'none',
                    }}
                  >
                    Visa på Instagram <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.15)',
                border: 'none',
                color: '#fff',
                width: '48px',
                height: '48px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              aria-label="Nästa bild"
            >
              <ChevronRight size={28} />
            </button>
          </div>,
          document.body
        )}

      <style>{`
        @media (max-width: 1024px) {
          .insta-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 580px) {
          .insta-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
