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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Dashboard
                  </Link>

                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-zinc-800 transition-colors text-sm"
                    onClick={() => setShowDropdown(false)}
                  >
                    <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
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
                    href="/dashboard/usage"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-zinc-800 transition-colors text-sm"
                    onClick={() => setShowDropdown(false)}
                  >
                    <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Usage
                  </Link>

                  <Link
                    href="/help"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-zinc-800 transition-colors text-sm"
                    onClick={() => setShowDropdown(false)}
                  >
                    <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Help & FAQs
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
