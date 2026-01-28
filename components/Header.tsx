'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import LiveUserCounter from './LiveUserCounter';

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
    <header className="sticky top-0 z-[100] glass px-4 sm:px-8 md:px-16 py-4 md:py-5 flex items-center justify-between noise">
      <Link href="/" className="flex items-center space-x-1.5 sm:space-x-3 hover:opacity-80 transition-opacity flex-shrink-0">
        <div className="bg-white text-black px-1.5 py-0.5 font-black text-sm sm:text-xl tracking-tighter leading-none select-none">
          404
        </div>
        <span className="text-sm sm:text-2xl font-black tracking-tighter uppercase font-sans">BASED404</span>
      </Link>

      <div className="flex items-center gap-1.5 sm:gap-4 flex-shrink min-w-0">
        <div className="flex items-center bg-white/5 border border-white/10 px-2 sm:px-4 py-1 rounded-full whitespace-nowrap overflow-hidden">
          <span className="text-[6px] xs:text-[7px] sm:text-[10px] font-bold tracking-widest uppercase opacity-80">
            <LiveUserCounter />
          </span>
        </div>

        {user ? (
          /* Logged In - Show User Menu */
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-cyan-500/20 border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors flex-shrink-0"
              aria-label="User menu"
            >
              <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-[10px] sm:text-sm font-medium text-cyan-300 truncate max-w-[60px] xs:max-w-[100px] sm:max-w-[150px]">
                {user.username ? `@${user.username}` : user.name}
              </span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl overflow-hidden">
                {/* User Info Header */}
                <div className="px-4 py-3 border-b border-zinc-800">
                  <p className="text-sm font-medium text-white">Hi {user.name}</p>
                  <p className="text-xs text-zinc-500">@{user.username || 'user'}</p>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-zinc-800 transition-colors text-sm"
                    onClick={() => setShowDropdown(false)}
                  >
                    <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                  </Link>

                  <Link
                    href="/dashboard/subscription"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-zinc-800 transition-colors text-sm"
                    onClick={() => setShowDropdown(false)}
                  >
                    <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Subscription
                  </Link>

                  <Link
                    href="/help"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-zinc-800 transition-colors text-sm"
                    onClick={() => setShowDropdown(false)}
                  >
                    <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Help
                  </Link>
                </div>

                {/* Logout */}
                <div className="border-t border-zinc-800 py-1">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full text-left px-4 py-2.5 hover:bg-zinc-800 transition-colors text-sm text-red-400"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
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
