import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  Phone,
  Mail,
  MapPin,
  Building,
  Instagram,
  Check,
  ArrowRight,
  ShieldCheck,
  Award,
  Zap,
  Clock,
  Wrench,
  Flame,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import Button from '../components/Button';
import SocialBanner from '../components/SocialBanner';
import FAQAccordion from '../components/FAQAccordion';
import CallModal from '../components/CallModal';
import { usePageTitle } from '../hooks/usePageTitle';
import services, { ServiceItem } from '../data/services';

const container: React.CSSProperties = {
  maxWidth: 'var(--container-max)',
  margin: '0 auto',
  padding: '0 clamp(20px, 5vw, 40px)',
};

const homeFaqItems = [
  {
    question: 'Arbetar ni enligt gällande branschregler och normer?',
    answer: 'Ja, alla våra installationer utförs fackmannamässigt enligt gällande branschregler och svenska standarder för att garantera ett tryggt och godkänt resultat.',
  },
  {
    question: 'Hur fungerar ROT-avdraget för VVS- och rörmokeriarbeten?',
    answer: 'Som privatperson har du rätt till 30 % ROT-avdrag på arbetskostnaden upp till 50 000 kr per person och år. Vi administrerar hela avdraget direkt med Skatteverket och drar av beloppet på din faktura.',
  },
  {
    question: 'Hur snabbt kan ni rycka ut vid akuta läckor och rörproblem?',
    answer: 'Vi prioriterar alltid akuta ärenden som vattenläckor, trasiga varmvattenberedare och akuta stopp i avlopp för att minimera risken för omfattande vattenskador.',
  },
  {
    question: 'Vilka typer av värmepumpar installerar och servar ni?',
    answer: 'Vi installerar samt servar bergvärme, luft/vatten- och frånluftsvärmepumpar från marknadsledande tillverkare som NIBE, CTC, Bosch, Daikin och IVT.',
  },
  {
    question: 'Kostar det något att få en offert eller ett platsbesök?',
    answer: 'Nej, vi erbjuder alltid kostnadsfria offerter och rådgivning helt utan förbindelser inför ditt VVS- eller värmepumpsprojekt.',
  },
];

const customerReviews = [
  {
    id: 1,
    name: 'Johan Eriksson',
    location: 'Södermalm, Stockholm',
    stars: 5,
    project: 'Komplett badrums-VVS & blandarbyte',
    text: 'Anlitade VVS Agent Stockholm för rördragning och installation av badrumsinredning vid vår totalrenovering. Fantastiskt bemötande från första kontakten! Allt utfördes fackmannamässigt och enligt tidsplan. Mycket nöjd!',
  },
  {
    id: 2,
    name: 'Sofia Lindgren',
    location: 'Bromma, Stockholm',
    stars: 5,
    project: 'Installation av köks-VVS & diskmaskin',
    text: 'Snabb och proffsig hjälp när vi byggde om köket. Farid och hans team var punktliga, noggranna och gav suveräna råd kring rördragningen. ROT-avdraget drogs direkt på fakturan utan krångel.',
  },
  {
    id: 3,
    name: 'Mikael Wahlberg',
    location: 'Täby, Stockholm',
    stars: 5,
    project: 'Service av värmesystem & shuntgrupp',
    text: 'Fick problem med ojämn värme i villan. VVS Agent Stockholm kom ut snabbt, felsökte och justerade in shuntgruppen samt bytte ut en sliten cirkulationspump. Proffsigt och prisvärt!',
  },
  {
    id: 4,
    name: 'Anna Karlsson',
    location: 'Vasastan, Stockholm',
    stars: 5,
    project: 'Fastighetsservice & rörinspektion',
    text: 'Anlitar VVS Agent Stockholm för löpande VVS-service i vår BRF. Alltid snabb återkoppling, tydliga offerter och ett personligt engagemang som man sällan ser hos hantverkare.',
  },
];

export default function Home() {
  usePageTitle(
    'VVS AGENT STOCKHOLM AB | Specialister inom VVS & Fastighetsservice',
    'Professionellt VVS-företag i Stockholm. Specialister på kök, badrum, värmesystem och fastighetsservice. 10 MSEK försäkring och 30% ROT-avdrag.'
  );

  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  // Form state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (heroBgRef.current) {
            heroBgRef.current.style.transform = `translate3d(0, ${window.scrollY * 0.35}px, 0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const attemptPlay = () => {
      if (!video) return;
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {});
      }
    };

    attemptPlay();

    const events = ['loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough', 'playing'];
    events.forEach((event) => video.addEventListener(event, attemptPlay));

    const unlockPlay = () => {
      if (video && video.paused) {
        attemptPlay();
      }
    };

    window.addEventListener('touchstart', unlockPlay, { passive: true });
    window.addEventListener('touchend', unlockPlay, { passive: true });
    window.addEventListener('scroll', unlockPlay, { passive: true });
    window.addEventListener('click', unlockPlay, { passive: true });

    return () => {
      events.forEach((event) => video.removeEventListener(event, attemptPlay));
      window.removeEventListener('touchstart', unlockPlay);
      window.removeEventListener('touchend', unlockPlay);
      window.removeEventListener('scroll', unlockPlay);
      window.removeEventListener('click', unlockPlay);
    };
  }, []);

  return (
    <main style={{ fontFamily: 'var(--font-body)', background: 'var(--dark-hero)' }}>

      {/* ── 1. HERO-SEKTIONEN ───────────────────────────────────── */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: '140px',
        paddingBottom: '100px',
        boxSizing: 'border-box',
        background: 'linear-gradient(180deg, #07131e 0%, #03080d 100%)',
      }}>
        {/* Parallax Background Video / Image */}
        <div
          ref={heroBgRef}
          style={{
            position: 'absolute',
            inset: '-15% 0',
            zIndex: 0,
            willChange: 'transform',
          }}
        >
          <video
            ref={heroVideoRef}
            src="/hero-video.mp4"
            preload="auto"
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              opacity: 1,
            }}
          >
            <source src="/hero-video.mp4" type="video/mp4" />
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_3G5LlmMYORSdAk8SxzXrK2S0Is5/hf_20260812_233545_f4a7afb0-ad1a-4be9-934a-6e90661f4992.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Soft Contrast Gradient Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(7, 19, 30, 0.75) 0%, rgba(7, 19, 30, 0.42) 50%, rgba(7, 19, 30, 0.15) 100%)',
          zIndex: 1,
        }} />

        <div style={{ ...container, position: 'relative', zIndex: 2, width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left',
            maxWidth: '780px',
            margin: '0',
          }}>
            {/* Official H1 Headline */}
            <ScrollReveal animation="fade-up" delay={0} duration={0.8}>
              <h1 style={{
                color: '#ffffff',
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.4rem, 5.2vw, 4.2rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                margin: '0 0 20px 0',
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
              }}>
                Specialister inom VVS & fastighetsservice
              </h1>
            </ScrollReveal>

            {/* Ingress */}
            <ScrollReveal animation="fade-up" delay={200} duration={0.8}>
              <p style={{
                color: 'rgba(255, 255, 255, 0.92)',
                fontSize: 'clamp(1.02rem, 1.8vw, 1.2rem)',
                lineHeight: 1.65,
                maxWidth: '680px',
                margin: '0 0 28px 0',
                fontWeight: 400,
              }}>
                Söker du en pålitlig och auktoriserad rörmokare i Stockholm? Vi utför kompletta VVS-arbeten, kök, badrum och värmesystem för privatpersoner, BRF:er och fastighetsägare med fasta priser och 30% ROT-avdrag.
              </p>
            </ScrollReveal>

            {/* Checkmark-punkter med gyllene bock-ikoner (inspirerat av referensdesign) */}
            <ScrollReveal animation="fade-up" delay={250} duration={0.8}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                marginBottom: '36px',
                width: '100%',
              }}>
                {[
                  'VVS-service & rörarbeten',
                  'Jour & akuta ärenden',
                  'VVS-tjänster i Stockholm med omnejd',
                ].map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                  }}>
                    <Check size={22} color="var(--primary)" strokeWidth={3} style={{ flexShrink: 0 }} />
                    <span style={{
                      color: '#ffffff',
                      fontSize: 'clamp(1.05rem, 1.6vw, 1.2rem)',
                      fontWeight: 500,
                      letterSpacing: '0.01em',
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Knappar: Offertförfrågan (Koppar) + Våra Tjänster (Outline) */}
            <ScrollReveal animation="fade-up" delay={300} duration={0.8}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                flexWrap: 'wrap',
              }}>
                <Button variant="primary" size="lg" href="#offert">
                  Offertförfrågan
                </Button>

                <Button variant="outline" size="lg" href="#tjanster">
                  Våra Tjänster
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 2. TRUST-BAR (Under Hero) ─────────────────────────────── */}
      <section style={{
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        minHeight: '64px',
        display: 'flex',
        alignItems: 'center',
        padding: '16px 0',
        position: 'relative',
        zIndex: 10,
      }}>
        <div style={{ ...container, width: '100%' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            flexWrap: 'wrap',
            gap: '14px',
          }}>
            <div style={{ display: 'flex', gap: '3px' }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
              ))}
            </div>
            <span style={{
              fontWeight: 700,
              fontSize: '1rem',
              color: '#111827',
              letterSpacing: '0.01em',
            }}>
              4.9 / 5 i betyg på Reco & Google | Över 50+ verifierade kundomdömen
            </span>
          </div>
        </div>
      </section>

      {/* ── CALL MODAL POPUP ────────────────────────────────────── */}
      <CallModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
      />

      {/* ── 3. TJÄNSTER (Philip Rörmokaren stil) ────────────────── */}
      <section
        id="tjanster"
        style={{
          background: 'var(--light-bg, #ffffff)',
          padding: 'clamp(70px, 8vw, 100px) 0',
        }}
      >
        <div style={container}>
          {/* Header: Left Title + Right Text */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '24px',
          }}>
            <div>
              <ScrollReveal animation="fade-up">
                <h2 style={{
                  color: '#000000',
                  fontWeight: 900,
                  fontSize: 'clamp(2.6rem, 5vw, 3.8rem)',
                  letterSpacing: '-0.02em',
                  margin: 0,
                  lineHeight: 1.1,
                  fontFamily: 'var(--font-heading)',
                }}>
                  Våra tjänster
                </h2>
              </ScrollReveal>
            </div>

            <div style={{ maxWidth: '480px' }}>
              <ScrollReveal animation="fade-up" delay={100}>
                <p style={{
                  color: '#222222',
                  fontSize: '0.96rem',
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  Vi erbjuder auktoriserade VVS- och fastighetslösningar i hela Stockholmsområdet med fokus på fackmannamässig kvalitet, trygghet och långsiktig funktion.
                </p>
              </ScrollReveal>
            </div>
          </div>

          {/* 4 full-bleed mörka bildkort i grid (Fullt mobilanpassad) */}
          <div className="home-services-grid">
            {services.map((svc: ServiceItem, index: number) => (
              <ScrollReveal key={svc.slug} animation="fade-up" delay={index * 80}>
                <Link
                  to={svc.href}
                  className="home-service-card"
                  data-service-slug={svc.slug}
                >
                  {/* Bakgrundsbild */}
                  <img
                    src={svc.image}
                    alt={svc.title}
                    data-service-slug={svc.slug}
                    loading="lazy"
                    className="card-bg-img"
                    style={{
                      objectPosition: svc.homeImagePosition || svc.imagePosition || 'center center',
                      transform: svc.homeImageTransform || undefined,
                    }}
                  />

                  {/* Mörk overlay med mjuk gradient */}
                  <div className="home-service-overlay" />

                  {/* Textinnehåll placerat längst ner över bilden */}
                  <div className="home-service-content">
                    <h3 className="home-service-title">
                      {svc.title}
                    </h3>
                    <p className="home-service-desc">
                      {svc.shortDescription}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. "OM OSS" – DIN LOKALA VVS-EXPERT I STOCKHOLM (Kopparsektion) ─────── */}
      <section
        id="om-oss"
        style={{
          background: 'var(--copper-section, #af7349)',
          color: '#ffffff',
          padding: 'clamp(80px, 10vw, 120px) 0',
        }}
      >
        <div style={container}>
          <div className="split-50-50">
            {/* Vänster: Personlig grundarhistoria */}
            <div>
              <ScrollReveal animation="fade-right">
                <h2 style={{
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: 'clamp(2.1rem, 3.8vw, 3rem)',
                  lineHeight: 1.15,
                  margin: '0 0 20px 0',
                }}>
                  Din lokala VVS-expert i Stockholm
                </h2>
              </ScrollReveal>

              <ScrollReveal animation="fade-right" delay={100}>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontSize: '1.05rem',
                  lineHeight: 1.75,
                  margin: '0 0 20px 0',
                }}>
                  VVS AGENT STOCKHOLM AB drivs av auktoriserade VVS-installatörer med lång yrkeserfarenhet inom rörarbeten, kök, badrum, värmesystem och komplett fastighetsservice i hela Stockholmsregionen.
                </p>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.88)',
                  fontSize: '0.98rem',
                  lineHeight: 1.7,
                  margin: '0 0 28px 0',
                }}>
                  För oss är personlig kontakt, hög tillgänglighet och ett fackmannamässigt hantverk en självklarhet. Oavsett om det rör sig om en akut insats, en planerad badrumsrenovering eller löpande fastighetsskötsel garanterar vi högsta kvalitet och trygghet från start till mål.
                </p>
              </ScrollReveal>

              <ScrollReveal animation="fade-right" delay={200}>
                <Button variant="white" size="lg" href="#offert">
                  Begär kostnadsfri offert
                </Button>
              </ScrollReveal>
            </div>

            {/* Höger: Video-sektion eller bild */}
            <div>
              <ScrollReveal animation="fade-left" delay={150}>
                <div style={{
                  borderRadius: '4px',
                  overflow: 'hidden',
                  boxShadow: '0 16px 40px rgba(0, 0, 0, 0.25)',
                  height: '460px',
                  position: 'relative',
                  background: '#07131e',
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
                    <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '1rem', textTransform: 'uppercase' }}>
                      VVS AGENT STOCKHOLM AB
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem' }}>
                      Kvalitetsgaranti & trygg VVS i hela Stockholm
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. INSTAGRAM & PROJEKTGALLERI (SocialBanner.tsx - Real Embedded Posts) ──── */}
      <SocialBanner />

      {/* ── 6. RECO OMDÖMES-SLIDER ──────────────────────────────── */}
      <section
        id="omdomen"
        style={{
          background: 'var(--light-alt, #f4f4f4)',
          color: 'var(--text-dark)',
          padding: 'clamp(80px, 10vw, 110px) 0',
          position: 'relative',
          borderTop: '1px solid #e2e8f0',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <div style={container}>
          {/* Header */}
          <div style={{
            textAlign: 'center',
            maxWidth: '680px',
            margin: '0 auto 48px auto',
          }}>
            <ScrollReveal animation="fade-up">
              <h2 style={{
                color: 'var(--text-dark)',
                fontWeight: 800,
                fontSize: 'clamp(2rem, 3.6vw, 2.7rem)',
                letterSpacing: '-0.02em',
                margin: '0 0 14px 0',
                lineHeight: 1.2,
              }}>
                Nöjda kunder på Reco & Google
              </h2>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#ffffff',
                padding: '6px 16px',
                borderRadius: '4px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                marginTop: '6px',
              }}>
                <div style={{ display: 'flex', gap: '3px' }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-dark)' }}>
                  4.9 / 5 i snittbetyg (Över 50 omdömen)
                </span>
              </div>
            </ScrollReveal>
          </div>

          {/* Interactive Review Slider / Cards */}
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <ScrollReveal animation="fade-up" delay={150}>
              <div style={{
                background: '#ffffff',
                borderRadius: '4px',
                padding: 'clamp(32px, 5vw, 48px)',
                border: '1px solid #e2e8f0',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                position: 'relative',
              }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  {Array.from({ length: customerReviews[activeReviewIdx].stars }).map((_, i) => (
                    <Star key={i} size={20} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>

                <p style={{
                  color: 'var(--color-gray-700, #333333)',
                  fontSize: 'clamp(1.05rem, 1.8vw, 1.22rem)',
                  lineHeight: 1.7,
                  fontStyle: 'italic',
                  margin: '0 0 24px 0',
                }}>
                  "{customerReviews[activeReviewIdx].text}"
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  flexWrap: 'wrap',
                  gap: '16px',
                  borderTop: '1px solid #f1f5f9',
                  paddingTop: '20px',
                }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-dark)' }}>
                      {customerReviews[activeReviewIdx].name}
                    </div>
                    <div style={{ color: 'var(--primary)', fontSize: '0.88rem', fontWeight: 600 }}>
                      {customerReviews[activeReviewIdx].location} • {customerReviews[activeReviewIdx].project}
                    </div>
                  </div>

                  {/* Slider controls */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setActiveReviewIdx((prev) => (prev - 1 + customerReviews.length) % customerReviews.length)}
                      style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        color: '#111827',
                        width: '40px',
                        height: '40px',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#e2e8f0')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = '#f8fafc')}
                      aria-label="Föregående omdöme"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => setActiveReviewIdx((prev) => (prev + 1) % customerReviews.length)}
                      style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        color: '#111827',
                        width: '40px',
                        height: '40px',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#e2e8f0')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = '#f8fafc')}
                      aria-label="Nästa omdöme"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 7. KONTAKT & OFFERT (Kopparsektion 50/50 Split) ──────── */}
      <section
        id="offert"
        style={{
          background: 'var(--copper-section, #af7349)',
          color: '#ffffff',
          padding: 'clamp(80px, 10vw, 120px) 0',
        }}
      >
        <div style={container}>
          <div className="split-50-50">
            {/* Vänster kolumn: Offertförfrågan Formulär */}
            <div>
              <ScrollReveal animation="fade-right">
                <h2 style={{
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: 'clamp(2rem, 3.6vw, 2.7rem)',
                  lineHeight: 1.15,
                  margin: '0 0 14px 0',
                }}>
                  Offertförfrågan
                </h2>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  margin: '0 0 28px 0',
                }}>
                  Fyll i formuläret nedan för ett kostnadsfritt prisförslag med fast pris och 30% ROT-avdrag.
                </p>
              </ScrollReveal>

              {formSubmitted ? (
                <div style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  padding: '30px',
                  borderRadius: '4px',
                  textAlign: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}>
                  <Check size={40} color="#ffffff" style={{ margin: '0 auto 12px auto' }} />
                  <h3 style={{ color: '#ffffff', fontSize: '1.3rem', margin: '0 0 8px 0' }}>Tack för din förfrågan!</h3>
                  <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0 }}>Vi återkommer till dig med offert och rådgivning inom 24 timmar.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <input
                    type="text"
                    required
                    placeholder="Ditt namn *"
                    className="copper-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Telefonnummer *"
                    className="copper-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <input
                    type="email"
                    required
                    placeholder="E-postadress *"
                    className="copper-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <textarea
                    required
                    rows={4}
                    placeholder="Beskriv ditt ärende eller projekt... *"
                    className="copper-input"
                    style={{ resize: 'vertical' }}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                  <Button variant="white" size="lg" className="w-full">
                    Skicka offertförfrågan
                  </Button>
                </form>
              )}
            </div>

            {/* Höger kolumn: Kontaktinformation */}
            <div id="kontakt">
              <ScrollReveal animation="fade-left" delay={100}>
                <h2 style={{
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: 'clamp(2rem, 3.6vw, 2.7rem)',
                  lineHeight: 1.15,
                  margin: '0 0 14px 0',
                }}>
                  Kontaktuppgifter
                </h2>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  margin: '0 0 32px 0',
                }}>
                  Välkommen att höra av dig direkt via telefon eller e-post vid frågor, rådgivning eller akuta ärenden.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  {/* Telefon */}
                  <a
                    href="tel:+46735000250"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      color: '#ffffff',
                      textDecoration: 'none',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                    }}
                  >
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '4px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Phone size={22} color="#ffffff" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase' }}>Telefon</div>
                      <div>073-500 02 50</div>
                    </div>
                  </a>

                  {/* E-post */}
                  <a
                    href="mailto:info@vvsagent.se"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      color: '#ffffff',
                      textDecoration: 'none',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                    }}
                  >
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '4px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Mail size={22} color="#ffffff" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase' }}>E-post</div>
                      <div>info@vvsagent.se</div>
                    </div>
                  </a>

                  {/* Adress & Ort */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    color: '#ffffff',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                  }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '4px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <MapPin size={22} color="#ffffff" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase' }}>Område</div>
                      <div>Stockholm med omnejd</div>
                    </div>
                  </div>

                  {/* Org.nr */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    color: '#ffffff',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                  }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '4px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Building size={22} color="#ffffff" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase' }}>F-skatt & Försäkring</div>
                      <div>Godkänd för F-skatt • Org.nr: 559368-1066</div>
                    </div>
                  </div>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/vvsagent/"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      color: '#ffffff',
                      textDecoration: 'none',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                    }}
                  >
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '4px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Instagram size={22} color="#ffffff" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase' }}>Sociala medier</div>
                      <div>@vvsagent på Instagram</div>
                    </div>
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. VANLIGA FRÅGOR (FAQ) ──────────────────────────────── */}
      <section style={{
        background: '#ffffff',
        padding: 'clamp(70px, 9vw, 110px) 0',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid #e2e8f0',
      }}>
        <div style={container}>
          <FAQAccordion
            items={homeFaqItems}
            title="Vanliga frågor om VVS & Värmepumpar"
            subtitle="Här hittar du svar på vanliga funderingar kring VVS-arbeten, ROT-avdrag, värmepumpsbyten och akuta ärenden."
            buttonText="Kontakta oss direkt"
            buttonLink="#kontakt"
            dark={false}
          />
        </div>
      </section>

      <style>{`
        .home-services-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .home-service-card {
          position: relative;
          height: 460px;
          overflow: hidden;
          border-radius: 4px;
          display: block;
          text-decoration: none;
          background: #07131e;
        }
        .home-service-card .card-bg-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .home-service-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(7, 19, 30, 0.94) 0%, rgba(7, 19, 30, 0.6) 30%, rgba(7, 19, 30, 0.08) 65%, transparent 100%);
          transition: background 0.3s ease;
        }
        .home-service-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 22px 18px;
          z-index: 2;
        }
        .home-service-title {
          color: #ffffff;
          font-weight: 800;
          font-size: 1.25rem;
          margin: 0 0 8px 0;
          line-height: 1.2;
          letter-spacing: -0.01em;
          font-family: var(--font-heading);
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
        }
        .home-service-desc {
          color: rgba(255, 255, 255, 0.92);
          font-size: 0.88rem;
          line-height: 1.45;
          margin: 0;
          font-weight: 400;
          text-shadow: 0 1px 6px rgba(0, 0, 0, 0.8);
        }

        @media (max-width: 1100px) {
          .home-services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
          .home-service-card {
            height: 420px !important;
          }
        }
        @media (max-width: 640px) {
          .home-services-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .home-service-card {
            height: 380px !important;
          }
          .home-service-content {
            padding: 18px 16px !important;
          }
          .home-service-title {
            font-size: 1.2rem !important;
            margin-bottom: 6px !important;
          }
          .home-service-desc {
            font-size: 0.86rem !important;
            line-height: 1.45 !important;
          }
        }
      `}</style>
    </main>
  );
}
