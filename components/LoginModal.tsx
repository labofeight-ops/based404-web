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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
            <div className="relative max-w-md w-full mx-4">
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 text-white/40 hover:text-white/80 transition text-sm"
                >
                    Close
                </button>

                <div className="bg-zinc-900/90 border border-zinc-800 rounded-lg p-8">
                    <h2 className="text-xl font-medium mb-6 text-center text-white">
                        Connect with Telegram
                    </h2>

                    <div className="flex justify-center mb-4">
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
