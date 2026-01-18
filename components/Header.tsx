'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface HeaderProps {
  onLoginClick: () => void;
}

export default function Header({ onLoginClick }: HeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('auth_token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/50 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              BASED404
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-6">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-300 hover:text-white transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem('auth_token');
                    window.location.href = '/';
                  }}
                  className="text-gray-300 hover:text-white transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={onLoginClick}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
