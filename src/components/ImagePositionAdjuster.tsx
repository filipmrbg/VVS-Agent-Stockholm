import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Sliders, Copy, Check, RotateCcw, X, Move, ChevronDown, ChevronUp, LayoutGrid, FileText, ZoomIn } from 'lucide-react';
import { services as defaultServices } from '../data/services';

interface TransformState {
  scale: number; // e.g. 1.0 - 2.0
  offsetY: number; // e.g. -150 to +150 px
  offsetX: number; // e.g. -150 to +150 px
  objectPosY: number; // 0 - 100%
  objectPosX: number; // 0 - 100%
}

type ServiceAdjustMap = Record<string, TransformState>;

const STORAGE_KEY = 'vvs_img_adjuster_super_v3';

const defaultState = (slug: string, isHome: boolean): TransformState => {
  if (slug === 'badrum-kok') {
    return isHome
      ? { scale: 1.25, offsetY: 35, offsetX: 0, objectPosY: 50, objectPosX: 50 }
      : { scale: 1.0, offsetY: 0, offsetX: 0, objectPosY: 100, objectPosX: 51 };
  }
  return { scale: 1.0, offsetY: 0, offsetX: 0, objectPosY: 50, objectPosX: 50 };
};

export default function ImagePositionAdjuster() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'service'>(
    location.pathname === '/' ? 'home' : 'service'
  );
  const [selectedSlug, setSelectedSlug] = useState<string>('badrum-kok');
  const [copied, setCopied] = useState(false);
  const [isDraggingPad, setIsDraggingPad] = useState(false);
  const padRef = useRef<HTMLDivElement>(null);

  // Sync tab with page navigation
  useEffect(() => {
    if (location.pathname === '/') {
      setActiveTab('home');
    } else if (location.pathname.startsWith('/tjanster')) {
      setActiveTab('service');
    }
  }, [location.pathname]);

  const [homeAdjustments, setHomeAdjustments] = useState<ServiceAdjustMap>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_home`);
      if (saved) return JSON.parse(saved);
    } catch {}
    const init: ServiceAdjustMap = {};
    defaultServices.forEach((s) => {
      init[s.slug] = defaultState(s.slug, true);
    });
    return init;
  });

  const [serviceAdjustments, setServiceAdjustments] = useState<ServiceAdjustMap>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_service`);
      if (saved) return JSON.parse(saved);
    } catch {}
    const init: ServiceAdjustMap = {};
    defaultServices.forEach((s) => {
      init[s.slug] = defaultState(s.slug, false);
    });
    return init;
  });

  const currentMap = activeTab === 'home' ? homeAdjustments : serviceAdjustments;
  const currentAdj = currentMap[selectedSlug] || defaultState(selectedSlug, activeTab === 'home');
  const currentService = defaultServices.find((s) => s.slug === selectedSlug) || defaultServices[0];

  // Apply real-time styles to DOM
  const applyStylesToDom = useCallback((homeMap: ServiceAdjustMap, serviceMap: ServiceAdjustMap) => {
    let styleTag = document.getElementById('super-image-position-overrides') as HTMLStyleElement | null;
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'super-image-position-overrides';
      document.head.appendChild(styleTag);
    }

    let css = '';

    // Home cards
    Object.entries(homeMap).forEach(([slug, state]) => {
      css += `
        .home-service-card[data-service-slug="${slug}"] img,
        .home-services-grid img[data-service-slug="${slug}"] {
          object-position: ${state.objectPosX}% ${state.objectPosY}% !important;
          transform: scale(${state.scale}) translate(${state.offsetX}px, ${state.offsetY}px) !important;
          transform-origin: center center !important;
          transition: transform 0.05s ease-out, object-position 0.05s ease-out !important;
        }
      `;
    });

    // Services page
    Object.entries(serviceMap).forEach(([slug, state]) => {
      css += `
        #${slug} .service-image-col img,
        .service-detail-grid img[data-service-slug="${slug}"] {
          object-position: ${state.objectPosX}% ${state.objectPosY}% !important;
          transform: scale(${state.scale}) translate(${state.offsetX}px, ${state.offsetY}px) !important;
          transform-origin: center center !important;
          transition: transform 0.05s ease-out, object-position 0.05s ease-out !important;
        }
      `;
    });

    styleTag.innerHTML = css;
  }, []);

  useEffect(() => {
    applyStylesToDom(homeAdjustments, serviceAdjustments);
    try {
      localStorage.setItem(`${STORAGE_KEY}_home`, JSON.stringify(homeAdjustments));
      localStorage.setItem(`${STORAGE_KEY}_service`, JSON.stringify(serviceAdjustments));
    } catch {}
  }, [homeAdjustments, serviceAdjustments, applyStylesToDom]);

  const updateCurrentAdj = (updates: Partial<TransformState>) => {
    if (activeTab === 'home') {
      setHomeAdjustments((prev) => ({
        ...prev,
        [selectedSlug]: {
          ...(prev[selectedSlug] || defaultState(selectedSlug, true)),
          ...updates,
        },
      }));
    } else {
      setServiceAdjustments((prev) => ({
        ...prev,
        [selectedSlug]: {
          ...(prev[selectedSlug] || defaultState(selectedSlug, false)),
          ...updates,
        },
      }));
    }
  };

  // 2D Drag Pad Handler
  const handlePadInteraction = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    if (!padRef.current) return;
    const rect = padRef.current.getBoundingClientRect();
    const pctX = ((e.clientX - rect.left) / rect.width);
    const pctY = ((e.clientY - rect.top) / rect.height);

    const clampedPctX = Math.max(0, Math.min(1, pctX));
    const clampedPctY = Math.max(0, Math.min(1, pctY));

    // Map 0..1 to -100px .. +100px offset
    const offX = Math.round((clampedPctX - 0.5) * 200);
    const offY = Math.round((clampedPctY - 0.5) * 200);

    const objX = Math.round(clampedPctX * 100);
    const objY = Math.round(clampedPctY * 100);

    updateCurrentAdj({
      offsetX: offX,
      offsetY: offY,
      objectPosX: objX,
      objectPosY: objY,
    });
  };

  const handleMouseDownPad = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDraggingPad(true);
    handlePadInteraction(e);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingPad) handlePadInteraction(e);
    };
    const handleMouseUp = () => {
      if (isDraggingPad) setIsDraggingPad(false);
    };

    if (isDraggingPad) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingPad, activeTab, selectedSlug]);

  const handleCopyCode = () => {
    let snippet = '';
    if (activeTab === 'home') {
      snippet = `homeImagePosition: '${currentAdj.objectPosX}% ${currentAdj.objectPosY}%',\n    homeImageTransform: 'scale(${currentAdj.scale}) translate(${currentAdj.offsetX}px, ${currentAdj.offsetY}px)',`;
    } else {
      snippet = `imagePosition: '${currentAdj.objectPosX}% ${currentAdj.objectPosY}%',`;
    }
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    updateCurrentAdj(defaultState(selectedSlug, activeTab === 'home'));
  };

  // Convert offset to 0..1 for crosshair
  const crosshairX = Math.max(0, Math.min(100, ((currentAdj.offsetX / 200) + 0.5) * 100));
  const crosshairY = Math.max(0, Math.min(100, ((currentAdj.offsetY / 200) + 0.5) * 100));

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          zIndex: 9999,
        }}>
          <button
            onClick={() => setIsOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 18px',
              background: 'linear-gradient(135deg, #07131e 0%, #0d233a 100%)',
              color: '#ffffff',
              border: '1px solid rgba(234, 88, 12, 0.4)',
              borderRadius: '999px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.35), 0 0 15px rgba(234, 88, 12, 0.25)',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              fontFamily: 'var(--font-family)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
              e.currentTarget.style.boxShadow = '0 14px 30px rgba(0,0,0,0.4), 0 0 20px rgba(234, 88, 12, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.35), 0 0 15px rgba(234, 88, 12, 0.25)';
            }}
          >
            <span style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: 'var(--color-primary, #ea580c)',
              color: '#fff',
            }}>
              <Sliders size={14} />
            </span>
            <span>Justera bild & zoom</span>
            <span style={{
              background: 'rgba(234, 88, 12, 0.2)',
              color: '#ffedd5',
              padding: '2px 7px',
              borderRadius: '10px',
              fontSize: '11px',
              fontWeight: 600,
            }}>
              {activeTab === 'home' ? 'Startsida' : 'Tjänster'}
            </span>
          </button>
        </div>
      )}

      {/* Main Adjuster Panel */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          width: '380px',
          maxWidth: 'calc(100vw - 48px)',
          background: 'rgba(7, 19, 30, 0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(234, 88, 12, 0.35)',
          borderRadius: '16px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(234, 88, 12, 0.2)',
          zIndex: 99999,
          color: '#ffffff',
          fontFamily: 'var(--font-family)',
          overflow: 'hidden',
          animation: 'adjusterSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          <style>{`
            @keyframes adjusterSlideUp {
              from { opacity: 0; transform: translateY(20px) scale(0.97); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
            .super-slider {
              -webkit-appearance: none;
              width: 100%;
              height: 6px;
              border-radius: 3px;
              background: #1e293b;
              outline: none;
            }
            .super-slider::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 18px;
              height: 18px;
              border-radius: 50%;
              background: #ea580c;
              cursor: pointer;
              box-shadow: 0 0 10px rgba(234, 88, 12, 0.8);
              border: 2px solid #ffffff;
            }
            .super-preset-btn {
              padding: 6px 8px;
              font-size: 11px;
              font-weight: 600;
              border-radius: 6px;
              border: 1px solid rgba(255, 255, 255, 0.12);
              background: rgba(255, 255, 255, 0.05);
              color: rgba(255, 255, 255, 0.85);
              cursor: pointer;
              transition: all 0.15s ease;
            }
            .super-preset-btn:hover {
              background: rgba(234, 88, 12, 0.2);
              border-color: rgba(234, 88, 12, 0.5);
              color: #ffffff;
            }
            .super-tab-btn {
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 6px;
              padding: 10px;
              border: none;
              font-size: 12px;
              font-weight: 700;
              cursor: pointer;
              transition: all 0.15s ease;
            }
          `}</style>

          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            background: 'rgba(0, 0, 0, 0.3)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '26px',
                height: '26px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #ea580c, #c2410c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Sliders size={14} color="#fff" />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '-0.01em' }}>
                  Bildjusterare & Zoom
                </div>
                <div style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.5)' }}>
                  Flytta och zooma bilden fritt
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.6)',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: '6px',
                  display: 'flex',
                }}
                title={isMinimized ? 'Expandera' : 'Minimera'}
              >
                {isMinimized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.6)',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: '6px',
                  display: 'flex',
                }}
                title="Stäng"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Tab Selector */}
          {!isMinimized && (
            <div style={{
              display: 'flex',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              background: '#040b12',
            }}>
              <button
                onClick={() => setActiveTab('home')}
                className="super-tab-btn"
                style={{
                  background: activeTab === 'home' ? 'rgba(234, 88, 12, 0.2)' : 'transparent',
                  color: activeTab === 'home' ? '#ffedd5' : 'rgba(255, 255, 255, 0.6)',
                  borderBottom: activeTab === 'home' ? '2px solid #ea580c' : '2px solid transparent',
                }}
              >
                <LayoutGrid size={13} />
                <span>Startsida (Kort)</span>
              </button>
              <button
                onClick={() => setActiveTab('service')}
                className="super-tab-btn"
                style={{
                  background: activeTab === 'service' ? 'rgba(234, 88, 12, 0.2)' : 'transparent',
                  color: activeTab === 'service' ? '#ffedd5' : 'rgba(255, 255, 255, 0.6)',
                  borderBottom: activeTab === 'service' ? '2px solid #ea580c' : '2px solid transparent',
                }}
              >
                <FileText size={13} />
                <span>Tjänstesida (Vy)</span>
              </button>
            </div>
          )}

          {/* Body */}
          {!isMinimized && (
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Service Selector */}
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px', display: 'block' }}>
                  Välj tjänst
                </label>
                <select
                  value={selectedSlug}
                  onChange={(e) => setSelectedSlug(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: '#0f2336',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {defaultServices.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* 2D Interactive Drag Box */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Interaktiv dragyta (Dra fritt)
                  </label>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary, #ea580c)' }}>
                    Y: {currentAdj.offsetY > 0 ? `+${currentAdj.offsetY}px` : `${currentAdj.offsetY}px`} | Zoom: {Math.round(currentAdj.scale * 100)}%
                  </span>
                </div>

                <div
                  ref={padRef}
                  onMouseDown={handleMouseDownPad}
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '105px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    cursor: 'grab',
                    border: '1px solid rgba(234, 88, 12, 0.4)',
                    background: '#030a10',
                    userSelect: 'none',
                  }}
                >
                  <img
                    src={currentService.image}
                    alt={currentService.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: 0.65,
                      pointerEvents: 'none',
                      transform: `scale(${currentAdj.scale}) translate(${currentAdj.offsetX / 4}px, ${currentAdj.offsetY / 4}px)`,
                    }}
                  />

                  {/* Grid Lines */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
                    backgroundSize: '25% 25%',
                    pointerEvents: 'none',
                  }} />

                  {/* Center lines */}
                  <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(255,255,255,0.15)', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.15)', pointerEvents: 'none' }} />

                  {/* Crosshair Target */}
                  <div
                    style={{
                      position: 'absolute',
                      left: `${crosshairX}%`,
                      top: `${crosshairY}%`,
                      transform: 'translate(-50%, -50%)',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      border: '2px solid #ea580c',
                      background: 'rgba(234, 88, 12, 0.45)',
                      boxShadow: '0 0 12px rgba(234, 88, 12, 1), inset 0 0 6px rgba(255,255,255,0.8)',
                      pointerEvents: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#ffffff' }} />
                  </div>
                </div>
              </div>

              {/* Sliders */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                {/* Vertical Shift (Y) */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Move size={12} style={{ transform: 'rotate(90deg)' }} />
                      Vertikalt (Höj & Sänk):
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#f97316' }}>
                      {currentAdj.offsetY > 0 ? `Sänkt (+${currentAdj.offsetY}px)` : currentAdj.offsetY < 0 ? `Höjd (${currentAdj.offsetY}px)` : 'Centrerad (0px)'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="-120"
                    max="120"
                    step="1"
                    value={currentAdj.offsetY}
                    onChange={(e) => updateCurrentAdj({ offsetY: parseInt(e.target.value, 10) })}
                    className="super-slider"
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)', marginTop: '2px' }}>
                    <span>⬆️ Höj bild (-120px)</span>
                    <span>Mitt (0)</span>
                    <span>⬇️ Sänk bild (+120px)</span>
                  </div>
                </div>

                {/* Scale / Zoom */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <ZoomIn size={12} />
                      Zoom / Skala:
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#f97316' }}>
                      {Math.round(currentAdj.scale * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="2.0"
                    step="0.02"
                    value={currentAdj.scale}
                    onChange={(e) => updateCurrentAdj({ scale: parseFloat(e.target.value) })}
                    className="super-slider"
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)', marginTop: '2px' }}>
                    <span>100% (Passa)</span>
                    <span>125% (Flexibel)</span>
                    <span>200% (Närbild)</span>
                  </div>
                </div>

                {/* Horizontal Shift (X) */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Move size={12} />
                      Horisontell förskjutning (X):
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#f97316' }}>
                      {currentAdj.offsetX > 0 ? `+${currentAdj.offsetX}px` : `${currentAdj.offsetX}px`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="-80"
                    max="80"
                    step="1"
                    value={currentAdj.offsetX}
                    onChange={(e) => updateCurrentAdj({ offsetX: parseInt(e.target.value, 10) })}
                    className="super-slider"
                  />
                </div>
              </div>

              {/* Quick Presets */}
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px', display: 'block' }}>
                  Snabbval för startsida
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                  <button onClick={() => updateCurrentAdj({ scale: 1.25, offsetY: 40 })} className="super-preset-btn">
                    ⬇️ Sänk lagom (+40)
                  </button>
                  <button onClick={() => updateCurrentAdj({ scale: 1.3, offsetY: 70 })} className="super-preset-btn">
                    ⬇️ Sänk mer (+70)
                  </button>
                  <button onClick={() => updateCurrentAdj({ scale: 1.2, offsetY: 0 })} className="super-preset-btn">
                    🎯 Centrerad (0)
                  </button>
                </div>
              </div>

              {/* Code Snippet & Copy Button */}
              <div style={{
                background: '#040b12',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'monospace' }}>
                    services.ts inställning:
                  </span>
                  <code style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 700 }}>
                    {activeTab === 'home'
                      ? `scale(${currentAdj.scale}) Y:${currentAdj.offsetY}px`
                      : `Y: ${currentAdj.objectPosY}%`}
                  </code>
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={handleCopyCode}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '7px 10px',
                      background: copied ? '#16a34a' : 'var(--color-primary, #ea580c)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    <span>{copied ? 'Kopierat!' : 'Kopiera kod'}</span>
                  </button>
                  <button
                    onClick={handleReset}
                    title="Återställ till standard"
                    style={{
                      padding: '7px 10px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '6px',
                      color: 'rgba(255, 255, 255, 0.8)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <RotateCcw size={13} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
