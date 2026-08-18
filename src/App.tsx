import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Quote = lazy(() => import('./pages/Quote'));
const ServicesOverview = lazy(() => import('./pages/ServicesOverview'));
const Animations = lazy(() => import('./pages/Animations'));

function ScrollToTop() {
  const { pathname, state } = useLocation();
  useEffect(() => {
    document.body.style.overflow = '';
    const scrollTo = (state as { scrollTo?: string } | null)?.scrollTo;
    if (scrollTo) {
      const attempt = () => {
        const el = document.getElementById(scrollTo);
        if (el) {
          const y = el.getBoundingClientRect().top + window.pageYOffset - 90;
          window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
        }
      };
      const t1 = setTimeout(attempt, 120);
      const t2 = setTimeout(attempt, 400);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, state]);
  return null;
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  return (
    <div key={pathname} style={{ animation: 'pageFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
      {children}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            width: '36px',
            height: '36px',
            border: '3px solid rgba(234, 88, 12, 0.2)',
            borderTopColor: 'var(--color-primary)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      }>
        <Routes>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/tjanster" element={<PageWrapper><ServicesOverview /></PageWrapper>} />
          <Route path="/om-oss" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/kontakt" element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="/offert" element={<PageWrapper><Quote /></PageWrapper>} />
          <Route path="/animationer" element={<PageWrapper><Animations /></PageWrapper>} />
          <Route path="*" element={<PageWrapper><Home /></PageWrapper>} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}
