import Link from 'next/link';

const primaryButtonStyle = {
  backgroundColor: '#22c55e',
  color: '#0b1020',
  padding: '0.875rem 1.25rem',
  borderRadius: '0.625rem',
  fontWeight: 600,
  textDecoration: 'none',
  border: '1px solid #16a34a',
  display: 'inline-block'
};

const secondaryButtonStyle = {
  backgroundColor: 'transparent',
  color: '#e5e7eb',
  padding: '0.875rem 1.25rem',
  borderRadius: '0.625rem',
  fontWeight: 600,
  textDecoration: 'none',
  border: '1px solid #334155',
  display: 'inline-block'
};

export default function Home() {
  return (
    <main
      style={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #0f172a 0%, #111827 100%)',
        color: '#ffffff',
        padding: '2rem'
      }}
    >
      <div style={{ maxWidth: 960, width: '100%', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', lineHeight: 1.1, margin: '0 0 1rem' }}>
          Smart Attendance System
        </h1>
        <p style={{ opacity: 0.8, fontSize: '1.125rem', margin: '0 0 2rem' }}>
          QR codes, face verification, geofencing, and real-time analytics for modern campuses.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/register" legacyBehavior>
            <a style={primaryButtonStyle} aria-label="Get Started Free">
              Get Started Free
            </a>
          </Link>
          <Link href="/portal" legacyBehavior>
            <a style={secondaryButtonStyle} aria-label="Access Portal">
              Access Portal
            </a>
          </Link>
        </div>
      </div>
    </main>
  );
}
