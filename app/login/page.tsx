'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function LoginPage() {
    useEffect(() => {
        // Telegram login callback
        (window as any).onTelegramAuth = async (user: any) => {
            const res = await fetch('/api/auth/telegram', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });

            const data = await res.json();

            if (data.token) {
                localStorage.setItem('auth_token', data.token);
                window.location.href = '/dashboard';
            } else {
                alert('Login failed. Please try again.');
            }
        };
    }, []);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl shadow-purple-500/20">
                    <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Connect to Unlock
                    </h1>
                    <p className="text-gray-400 text-center mb-8">
                        Login with Telegram to access your dashboard
                    </p>

                    <div className="flex justify-center mb-6">
                        <Script
                            src="https://telegram.org/js/telegram-widget.js?22"
                            data-telegram-login="BASED404BOT"
                            data-size="large"
                            data-onauth="onTelegramAuth(user)"
                            data-request-access="write"
                            strategy="lazyOnload"
                        />
                    </div>

                    <p className="text-sm text-gray-500 text-center">
                        Connect your Telegram account to unlock biological override states
                    </p>
                </div>

                <div className="mt-8 text-center">
                    <a href="/" className="text-purple-400 hover:text-purple-300 transition">
                        ← Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
}
