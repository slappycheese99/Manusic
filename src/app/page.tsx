'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import ManusicApp from '@/components/ManusicApp';

export default function Home() {
  return (
    <AuthProvider>
      <ManusicApp />
    </AuthProvider>
  );
}

