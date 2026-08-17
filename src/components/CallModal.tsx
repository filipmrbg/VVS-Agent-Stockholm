import { Phone, X, UserCheck } from 'lucide-react';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CallModal({ isOpen, onClose }: CallModalProps) {
  if (!isOpen) return null;

  const contacts = [
    {
      name: 'VVS Agent Stockholm AB',
      role: 'Kundservice & Offert',
      phone: '073-500 02 50',
      tel: 'tel:+46735000250',
    },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(6px)',
        animation: 'fadeIn 0.25s ease-out',
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '440px',
          background: '#ffffff',
          borderRadius: '4px',
          padding: '32px 28px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          animation: 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: '#f1f5f9',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#64748b',
            transition: 'background 0.2s ease, color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#e2e8f0';
            e.currentTarget.style.color = '#0f172a';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#f1f5f9';
            e.currentTarget.style.color = '#64748b';
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              background: 'rgba(175, 115, 73, 0.12)',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
            }}
          >
            <Phone size={26} color="var(--color-primary)" />
          </div>
          <h2
            style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              color: '#0f172a',
              margin: '0 0 8px 0',
              fontFamily: 'var(--font-heading)',
            }}
          >
            Ring VVS Agent Stockholm
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
            Kontakta oss direkt för rådgivning, frågor och kostnadsfri kalkyl.
          </p>
        </div>

        {/* Contacts List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {contacts.map((c) => (
            <a
              key={c.name}
              href={c.tel}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                background: '#f8fafc',
                border: '1.5px solid #e2e8f0',
                borderRadius: '16px',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(234, 88, 12, 0.18)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f8fafc';
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <UserCheck size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <h3
                    style={{
                      margin: '0 0 2px 0',
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: '#0f172a',
                    }}
                  >
                    {c.name}
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>
                    {c.phone}
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  background: 'var(--color-primary)',
                  color: '#1a1f2e',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                }}
              >
                <Phone size={14} /> RING
              </div>
            </a>
          ))}
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleUp {
            from { opacity: 0; transform: scale(0.94); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </div>
    </div>
  );
}
