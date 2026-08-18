import React, { useState } from 'react';
import { ShieldCheck, Clock, Award, Send } from 'lucide-react';
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
    question: 'Kostar platsbesök eller rådgivning något?',
    answer: 'Nej, platsbesök och offert för värmepumpar, badrum och större VVS-arbeten är alltid helt kostnadsfritt och utan förbindelser.',
  },
  {
    question: 'Hur snabbt kan ni hjälpa till med mitt ärende?',
    answer: 'För akuta läckor och rörbrott prioriterar vi snabb inställelse. För planerade installationer som värmepumpar och badrumsrenoveringar bokar vi in startdatum i samråd med dig.',
  },
  {
    question: 'Hur fungerar ROT-avdraget för VVS-arbeten?',
    answer: 'Som privatperson drar vi av 30% av arbetskostnaden direkt på fakturan. Vi administrerar allt mot Skatteverket utan extra kostnad.',
  },
  {
    question: 'Får jag ett skriftligt intyg och garanti efter arbetet?',
    answer: 'Ja, vi utfärdar alltid skriftlig dokumentation och fulla garantier efter färdigställd installation för ditt och ditt försäkringsbolags trygghet.',
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

function focusInput(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = 'var(--primary)';
  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(175, 115, 73, 0.15)';
}
function blurInput(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = '#e5e7eb';
  e.currentTarget.style.boxShadow = 'none';
}

export default function Quote() {
  usePageTitle(
    'Begär offert | VVS Agent Stockholm AB – Fast Pris & ROT-avdrag',
    'Begär en kostnadsfri VVS-offert från VVS Agent Stockholm AB. Kök, badrum, värmesystem och fastighetsservice. Snabb återkoppling inom 24 timmar.'
  );
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [phone, setPhone]     = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');

  return (
    <main style={{ fontFamily: 'var(--font-body)' }}>

      {/* ── SECTION A: HERO ───────────────────────────────────── */}
      <section style={{
        position: 'relative',
        backgroundImage: 'url(https://i.imgur.com/UJRb9tO.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: '140px',
        paddingBottom: '60px',
        textAlign: 'center',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(7, 19, 30, 0.85)' }} />
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
                Begär kostnadsfri offert
              </h1>
            </ScrollReveal>
            <ScrollReveal animation="scale-x-center" delay={150} duration={0.6}>
              <span style={{ display: 'block', width: '60px', height: '3px', background: 'var(--primary)', borderRadius: '2px', margin: '14px auto 0' }} />
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={200}>
              <p style={{
                color: 'rgba(255,255,255,0.85)',
                fontSize: '1.05rem',
                maxWidth: '640px',
                margin: '20px auto 0',
                lineHeight: 1.65,
              }}>
                Beskriv ditt VVS-ärende nedan så återkommer vi med en tydlig kalkyl med fast pris och 30% ROT-avdrag inom 24 timmar.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── SECTION B: FORM & TRUST ───────────────────────────── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--color-light)' }}>
        <div style={container}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 340px',
            gap: '48px',
            alignItems: 'start',
          }} className="quote-grid">

            {/* Form */}
            <ScrollReveal animation="fade-right">
              <div style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '4px',
                padding: 'clamp(24px, 4vw, 40px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              }}>
                <h2 style={{
                  color: 'var(--text-dark)',
                  fontWeight: 700,
                  fontSize: '1.4rem',
                  margin: '0 0 24px 0',
                }}>
                  Fyll i dina uppgifter
                </h2>

                <form onSubmit={(e) => e.preventDefault()}>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dark)' }}>
                    Namn *
                  </label>
                  <input
                    type="text"
                    placeholder="Ditt för- och efternamn"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={inputStyle}
                    onFocus={focusInput}
                    onBlur={blurInput}
                    required
                  />

                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dark)' }}>
                    E-postadress *
                  </label>
                  <input
                    type="email"
                    placeholder="din.epost@doman.se"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                    onFocus={focusInput}
                    onBlur={blurInput}
                    required
                  />

                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dark)' }}>
                    Telefonnummer *
                  </label>
                  <input
                    type="tel"
                    placeholder="07X-XXX XX XX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={inputStyle}
                    onFocus={focusInput}
                    onBlur={blurInput}
                    required
                  />

                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dark)' }}>
                    Typ av VVS-tjänst
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    onFocus={focusInput}
                    onBlur={blurInput}
                  >
                    <option value="">Välj tjänst...</option>
                    <option value="varmepumpar">Värmepumpar & Värmesystem</option>
                    <option value="badrum-kok">Badrum & Kök</option>
                    <option value="reparation-underhall">Reparation & Underhåll</option>
                    <option value="radgivning-fastighetsservice">Rådgivning & Fastighetsservice</option>
                    <option value="annat">Annat VVS-ärende</option>
                  </select>

                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dark)' }}>
                    Projektbeskrivning *
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Beskriv vad du behöver hjälp med (t.ex. typ av värmepump, byte av blandare, misstänkt läcka, adress och önskad tidpunkt)..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
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
                    <Send size={16} /> Skicka offertförfrågan
                  </button>
                </form>
              </div>
            </ScrollReveal>

            {/* Sidebar Trust Items */}
            <ScrollReveal animation="fade-left" delay={150}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '16px',
                  padding: '24px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <Clock size={24} color="var(--color-primary)" />
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text-dark)' }}>
                      Svar inom 24 timmar
                    </h3>
                  </div>
                  <p style={{ margin: 0, color: 'var(--color-gray-600)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    Vi återkopplar snabbt med rådgivning och fast prisförslag utan dolda kostnader.
                  </p>
                </div>

                <div style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '16px',
                  padding: '24px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <ShieldCheck size={24} color="var(--color-primary)" />
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text-dark)' }}>
                      Kvalitetsgaranti & ROT-avdrag
                    </h3>
                  </div>
                  <p style={{ margin: 0, color: 'var(--color-gray-600)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    Fackmannamässigt VVS-montage med fullständigt garantiintyg och 30% ROT-avdrag direkt på fakturan.
                  </p>
                </div>

                <div style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '16px',
                  padding: '24px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <Award size={24} color="var(--color-primary)" />
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text-dark)' }}>
                      10 MSEK Ansvarsförsäkring
                    </h3>
                  </div>
                  <p style={{ margin: 0, color: 'var(--color-gray-600)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    Full trygghet och heltäckande försäkringsskydd mot alla typer av vattenskador.
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ── SECTION C: FAQ ────────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: '#ffffff' }}>
        <div style={container}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <ScrollReveal animation="blur-in">
              <h2 style={{
                color: 'var(--color-text-dark)',
                fontWeight: 800,
                fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
                margin: '0 0 14px 0',
              }}>
                Vanliga frågor inför din VVS-offert
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="scale-x-center" delay={150} duration={0.6}>
              <span style={{ display: 'block', width: '50px', height: '3px', background: 'var(--color-primary)', borderRadius: '2px', margin: '0 auto 0 auto' }} />
            </ScrollReveal>
          </div>

          <ScrollReveal animation="fade-up" delay={200}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <FAQAccordion items={faqItems} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SECTION D: CTA BANNER ─────────────────────────────── */}
      <CTABanner
        heading="Professionell VVS-service med fast pris & garanti"
        checkItems={[
          'Fackmannamässigt utförande med fulla garantier',
          '30% ROT-avdrag hanteras direkt på din faktura',
          'Erfarna VVS- och värmepumpstekniker',
        ]}
      />

      <style>{`
        @media (max-width: 900px) {
          .quote-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
