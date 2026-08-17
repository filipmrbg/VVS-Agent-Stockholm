import { ReactNode, MouseEventHandler, CSSProperties } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'outline' | 'dark' | 'white';
type Size = 'sm' | 'md' | 'lg';

interface Props {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  href?: string;
  onClick?: MouseEventHandler;
  className?: string;
  style?: CSSProperties;
}

const sizeStyles: Record<Size, CSSProperties> = {
  sm: { padding: '12px 24px', fontSize: '13px' },
  md: { padding: '16px 32px', fontSize: '14px' },
  lg: { padding: '18px 36px', fontSize: '15px' },
};

const variantStyles: Record<Variant, CSSProperties> = {
  primary: {
    background: 'var(--primary)',
    color: '#ffffff',
    border: 'none',
  },
  outline: {
    background: 'transparent',
    color: '#ffffff',
    border: '2px solid #ffffff',
  },
  dark: {
    background: 'var(--dark-trust)',
    color: '#ffffff',
    border: 'none',
  },
  white: {
    background: '#ffffff',
    color: 'var(--text-dark)',
    border: 'none',
  },
};

const base: CSSProperties = {
  borderRadius: '4px',
  cursor: 'pointer',
  fontFamily: "var(--font-heading), 'Outfit', sans-serif",
  fontWeight: 600,
  letterSpacing: '0.2px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  lineHeight: 1.2,
  boxSizing: 'border-box',
};

function handleMouseEnter(e: React.MouseEvent<HTMLElement>, variant: Variant) {
  const el = e.currentTarget as HTMLElement;
  el.style.transform = 'translateY(-2px)';
  if (variant === 'primary') {
    el.style.background = 'var(--primary-hover)';
    el.style.boxShadow = '0 6px 20px rgba(175, 115, 73, 0.4)';
  } else if (variant === 'outline') {
    el.style.background = '#ffffff';
    el.style.color = 'var(--dark-hero)';
  } else if (variant === 'dark') {
    el.style.background = '#000000';
  } else if (variant === 'white') {
    el.style.background = '#f4f4f4';
  }
}

function handleMouseLeave(e: React.MouseEvent<HTMLElement>, variant: Variant) {
  const el = e.currentTarget as HTMLElement;
  el.style.transform = 'translateY(0)';
  el.style.boxShadow = 'none';
  if (variant === 'primary') {
    el.style.background = 'var(--primary)';
  } else if (variant === 'outline') {
    el.style.background = 'transparent';
    el.style.color = '#ffffff';
  } else if (variant === 'dark') {
    el.style.background = 'var(--dark-trust)';
  } else if (variant === 'white') {
    el.style.background = '#ffffff';
  }
}

export default function Button({ variant = 'primary', size = 'md', children, href, onClick, className, style: customStyle }: Props) {
  const combinedStyle: CSSProperties = {
    ...base,
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...customStyle,
  };

  // Internal route
  if (href && !href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('tel') && !href.startsWith('#')) {
    return (
      <Link
        to={href}
        className={className}
        style={combinedStyle}
        onClick={onClick}
        onMouseEnter={e => handleMouseEnter(e, variant)}
        onMouseLeave={e => handleMouseLeave(e, variant)}
      >
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={className}
        style={combinedStyle}
        onClick={onClick}
        onMouseEnter={e => handleMouseEnter(e, variant)}
        onMouseLeave={e => handleMouseLeave(e, variant)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={className}
      style={combinedStyle}
      onClick={onClick}
      onMouseEnter={e => handleMouseEnter(e, variant)}
      onMouseLeave={e => handleMouseLeave(e, variant)}
    >
      {children}
    </button>
  );
}
