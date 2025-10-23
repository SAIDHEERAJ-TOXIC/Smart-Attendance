'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PortalRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      // TODO: Inspect token/role and route accordingly once auth is wired up.
      router.replace(token ? '/login' : '/login');
    } catch (_err) {
      router.replace('/login');
    }
  }, [router]);

  return (
    <main style={{ padding: '2rem' }}>Redirecting to portal…</main>
  );
}
