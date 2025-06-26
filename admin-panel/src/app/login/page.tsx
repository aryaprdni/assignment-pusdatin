'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../features/auth/hooks/use-login';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) router.push('/dashboard');
    else setError('Email atau password salah');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">
        <div className="hidden md:flex items-center justify-center bg-blue-600 text-white p-6">
          <h2 className="text-3xl font-bold">Admin Panel</h2>
        </div>

        <div className="p-8">
          <h1 className="text-2xl font-semibold text-center text-blue-700">Sign In to Admin</h1>
          <p className="text-sm text-center text-gray-500 mb-6">Please use your admin credentials</p>

          {error && (
            <div className="bg-red-100 text-red-600 text-sm text-center p-2 rounded mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="admin123"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-400"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          <p className="text-xs text-gray-400 mt-6 text-center">
            Hint: <span className="font-semibold">admin@example.com</span> / <span className="font-semibold">admin123</span>
          </p>
        </div>
      </div>
    </main>
  );
}
