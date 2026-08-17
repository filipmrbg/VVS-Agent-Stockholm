import { useState } from 'react';
import { Phone, MapPin, Mail, ShieldCheck } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import FAQAccordion from '../components/FAQAccordion';
import CTABanner from '../components/CTABanner';
import { usePageTitle } from '../hooks/usePageTitle';

const container: React.CSSProperties = {
  maxWidth: 'var(--container-max)',
  margin: '0 auto',
  padding: '0 clamp(20px, 5vw, 40px)',
};

const faqItems = [
  {
    question: 'Hur snabbt kan ni komma vid akuta ärenden?',
    answer: 'Vi prioriterar alltid akuta rörbrott, läckor och trasiga värmepumpar för att minimera risken för följdskador. Ring oss direkt vid brådskande ärenden!',
  },
  {
    question: 'Arbetar ni med 30% ROT-avdrag?',
    answer: 'Ja, vi administrerar 30% ROT-avdrag direkt på fakturan för alla privatpersoner enligt Skatteverkets regler.',
  },
  {
    question: 'Erhåller jag garanti och dokumentation efter arbetet?',
    answer: 'Ja, alla våra arbeten utförs fackmannamässigt med full garanti och skriftlig dokumentation för din och ditt försäkringsbolags trygghet.',
  },
  {
    question: 'Kostar ett hembesök eller offert något?',
    answer: 'Nej, vi erbjuder alltid kostnadsfria platsbesök och prisförslag utan ',
  },
];

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  border: '1px solid #e5e7eb',
  borderRadius: '4px',
  background: '#fafafa',
  fontSize: '0.95rem',
  fontFamily: 'var(--font-body)',
  color: 'var(--text-dark)',
  outline: 'none',
  boxSizing: 'border-box',
  marginBottom: '16px',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  display: 'block',
};

function focusInput(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = 'var(--primary)';
  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(175, 115, 73, 0.15)';
}
function blurInput(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = '#e5e7eb';
  e.currentTarget.style.boxShadow = 'none';
}

export default function Contact() {
  usePageTitle(
    'Kontakta oss | VVS Agent Stockholm AB – Specialister inom VVS',
    'Kontakta VVS Agent Stockholm AB för kostnadsfri offert, rådgivning eller service. Telefon: 073-500 02 50, E-post: info@vvsagent.se.'
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  return (
    <main style={{ fontFamily: 'var(--font-body)' }}>

      {/* ── SECTION A: HERO ───────────────────────────────────── */}
      <section style={{
        position: 'relative',
        backgroundImage: 'url(/contact-hero-bg.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: '140px',
        paddingBottom: '60px',
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
                Kontakta VVS Agent Stockholm
              </h1>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={150}>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', margin: 0 }}>
                Vi återkopplar snabbt. Kostnadsfritt platsbesök och prisförslag ingår alltid.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── SECTION B: CONTACT CONTENT ────────────────────────── */}
      <section style={{ background: '#f8fafc', padding: '80px 0' }}>
        <div style={container}>
          <div className="contact-grid" style={{
            display: 'grid',
            gridTemplateColumns: '45% 55%',
            gap: '60px',
            alignItems: 'start',
          }}>

            {/* Left: info */}
            <ScrollReveal animation="fade-right" duration={0.8}>
              <h2 style={{
                color: 'var(--text-dark)',
                fontWeight: 800,
                fontSize: 'clamp(1.6rem, 2.5vw, 2rem)',
                margin: '0 0 20px 0',
                lineHeight: 1.2,
              }}>
                Så når du oss
              </h2>
              <p style={{ color: 'var(--color-gray-600)', fontSize: '1rem', lineHeight: 1.8, margin: 0 }}>
                Du kan nå oss via formuläret, telefon eller e-post. Oavsett om det gäller kök, badrum, värmesystem eller fastighetsservice i Stockholm hjälper vi dig gärna.
              </p>

              <div style={{ marginTop: '36px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    minWidth: '48px',
                    background: 'rgba(175, 115, 73, 0.12)',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Phone size={22} color="var(--primary)" />
                  </div>
                  <div>
                    <p style={{ margin: '0 0 4px 0', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-dark)' }}>
                      Telefon & Service
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <a
                        href="tel:+46735000250"
                        style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none', lineHeight: 1.5 }}
                      >
                        073-500 02 50
                      </a>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    minWidth: '48px',
                    background: 'rgba(175, 115, 73, 0.12)',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <ShieldCheck size={22} color="var(--primary)" />
                  </div>
                  <div>
                    <p style={{ margin: '0 0 4px 0', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-dark)' }}>
                      Trygghet & Försäkring
                    </p>
                    <p style={{ margin: 0, color: 'var(--color-gray-600)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                      Full ansvarsförsäkring upp till 10 MSEK
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    minWidth: '48px',
                    background: 'rgba(175, 115, 73, 0.12)',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Mail size={22} color="var(--primary)" />
                  </div>
                  <div>
                    <p style={{ margin: '0 0 4px 0', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-dark)' }}>
                      E-post
                    </p>
                    <a
                      href="mailto:info@vvsagent.se"
                      style={{ color: 'var(--color-gray-600)', fontSize: '0.95rem', textDecoration: 'none', lineHeight: 1.5, transition: 'color 0.2s ease' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-gray-600)')}
                    >
                      info@vvsagent.se
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: form */}
            <ScrollReveal animation="fade-left" duration={0.8} delay={100}>
              <h2 style={{
                color: 'var(--text-dark)',
                fontWeight: 800,
                fontSize: 'clamp(1.6rem, 2.5vw, 2rem)',
                margin: '0 0 24px 0',
                lineHeight: 1.2,
              }}>
                Skicka ett meddelande
              </h2>
              <div style={{
                background: 'var(--color-white)',
                padding: '40px',
                borderRadius: '4px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                border: '1px solid #e2e8f0',
              }}>
                <form onSubmit={e => e.preventDefault()}>
                  <input
                    type="text"
                    placeholder="Ditt namn *"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={inputStyle}
                    onFocus={focusInput}
                    onBlur={blurInput}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Din e-postadress *"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={inputStyle}
                    onFocus={focusInput}
                    onBlur={blurInput}
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Ditt telefonnummer *"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    style={inputStyle}
                    onFocus={focusInput}
                    onBlur={blurInput}
                    required
                  />
                  <textarea
                    rows={5}
                    placeholder="Ditt meddelande... *"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    style={{ ...inputStyle, resize: 'vertical', marginBottom: '24px' }}
                    onFocus={focusInput}
                    onBlur={blurInput}
                    required
                  />
                  <button
                    type="submit"
                    className="btn-craftsman btn-primary"
                    style={{
                      width: '100%',
                      padding: '16px',
                    }}
                  >
                    Skicka meddelande
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── SECTION C: FAQ ────────────────────────────────────── */}
      <section style={{ background: 'var(--color-dark)', padding: '100px 0' }}>
        <div style={container}>
          <FAQAccordion
            dark={true}
            items={faqItems}
            title="Vanliga frågor till rörmokaren"
            subtitle="Svar på vanliga frågor kring jour, priser och installationer. Ring oss direkt om du har en akut fråga!"
            buttonText="Begär offert"
            buttonLink="/offert"
          />
        </div>
      </section>

      <CTABanner
        heading="Professionellt VVS-arbete med fast pris & garanti"
        checkItems={[
          'Fackmannamässigt utförande med fulla garantier',
          'Snabb återkoppling inom 24 timmar & kostnadsfritt hembesök',
          '30% ROT-avdrag hanteras direkt på din faktura',
        ]}
      />

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </main>
  );
}

