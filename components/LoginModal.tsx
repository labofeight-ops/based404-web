'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="relative max-w-md w-full mx-4">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 text-white/60 hover:text-white transition"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl shadow-purple-500/20">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Connect to Unlock
                        </h2>
                        <p className="text-gray-400">
                            Login with Telegram to access your dashboard
                        </p>
                    </div>

                    <div className="flex justify-center mb-6" id="telegram-login-widget">
                        <Script
                            src="https://telegram.org/js/telegram-widget.js?22"
                            data-telegram-login="based404official"
                            data-size="large"
                            data-onauth="onTelegramAuth(user)"
                            data-request-access="write"
                            strategy="lazyOnload"
                        />
                    </div>

                    <p className="text-sm text-gray-500 text-center">
                        Your Telegram account connects to unlock<br />biological override states
                    </p>
                </div>
            </div>
        </div>
    );
}
