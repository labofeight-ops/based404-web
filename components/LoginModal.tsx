'use client';

import { useEffect } from 'react';
import Script from 'next/script';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    useEffect(() => {
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
            }
        };
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md">
            <div className="relative w-full max-w-sm mx-4">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 text-zinc-400 hover:text-white transition-colors text-sm font-medium"
                >
                    Close ✕
                </button>

                {/* Modal content - x.ai style */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-2">
                            Sign in
                        </h2>
                        <p className="text-sm text-zinc-400">
                            Continue with Telegram
                        </p>
                    </div>

                    <div className="flex justify-center mb-6">
                        <Script
                            src="https://telegram.org/js/telegram-widget.js?22"
                            data-telegram-login="based404official"
                            data-size="large"
                            data-onauth="onTelegramAuth(user)"
                            data-request-access="write"
                            strategy="lazyOnload"
                        />
                    </div>

                    <p className="text-xs text-zinc-500 text-center">
                        Secure authentication via Telegram
                    </p>
                </div>
            </div>
        </div>
    );
}
