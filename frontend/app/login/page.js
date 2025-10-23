import Link from 'next/link';

export default function LoginPage() {
  return (
    <main style={{ padding: '2rem', maxWidth: 480, margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Login</h1>
      <p style={{ marginBottom: '1rem' }}>
        This is a placeholder login page. Integrate API calls to <code>/api/auth/login</code>.
      </p>
      <p>
        New here? <Link href="/register">Create an account</Link>
      </p>
    </main>
  );
}
