'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks/use-login';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <Link href="/dashboard">
        <span className="font-bold text-xl cursor-pointer">Admin Panel</span>
      </Link>

      <div className="flex items-center space-x-4">
        {isAuthenticated && user ? (
          <>
            <span>Welcome, {user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="hover:underline">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
