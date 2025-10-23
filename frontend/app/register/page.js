import Link from 'next/link';

export default function RegisterPage() {
  return (
    <main style={{ padding: '2rem', maxWidth: 480, margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Create your account</h1>
      <p style={{ marginBottom: '1rem' }}>
        This is a placeholder registration page. Integrate API calls to <code>/api/auth/register</code>.
      </p>
      <p>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </main>
  );
}
