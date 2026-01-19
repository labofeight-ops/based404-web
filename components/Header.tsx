'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  onLoginClick?: () => void;
}

interface User {
  name: string;
  username?: string;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const sessionToken = localStorage.getItem('session_token');
    const userData = localStorage.getItem('user');

    if (sessionToken && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error('Failed to parse user data');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('session_token');
    localStorage.removeItem('user');
    setUser(null);
    setShowDropdown(false);
    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 z-[100] glass px-4 sm:px-8 md:px-16 py-4 md:py-5 flex items-center justify-between">
      <Link href="/" className="flex items-center space-x-2 sm:space-x-4 hover:opacity-80 transition-opacity">
        <div className="bg-white text-black px-1.5 sm:px-2 py-0.5 font-black text-base sm:text-xl tracking-tighter leading-none select-none">
          404
        </div>
        <span className="text-lg sm:text-2xl font-black tracking-tighter uppercase font-sans">BASED404</span>
      </Link>

      <div className="flex items-center gap-4">
        <div className="flex items-center space-x-2 sm:space-x-3 bg-white/5 border border-white/10 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full">
          <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-rose-500 rounded-full status-pulse shadow-[0_0_10px_#f43f5e]"></div>
          <span className="text-[8px] sm:text-[10px] font-bold tracking-[2px] sm:tracking-[3px] uppercase opacity-80">
            VIBE: ACTIVE
          </span>
        </div>

        {user ? (
          /* Logged In - Show User Menu */
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors"
              aria-label="User menu"
            >
              <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-sm font-medium text-cyan-300">
                {user.username ? `@${user.username}` : user.name}
              </span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden">
                <Link
                  href="/dashboard"
                  className="block px-4 py-3 hover:bg-zinc-800 transition-colors text-sm font-medium"
                  onClick={() => setShowDropdown(false)}
                >
                  📊 Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 hover:bg-zinc-800 transition-colors text-sm font-medium text-red-400"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Not Logged In - Show Login Button */
          onLoginClick && (
            <button
              onClick={onLoginClick}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
              aria-label="Login"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-sm font-medium">LOGIN</span>
            </button>
          )
        )}
      </div>
    </header>
  );
};

export default Header;
