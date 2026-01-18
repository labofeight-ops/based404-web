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
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={onClose}
        >
            <div
                className={`relative w-full max-w-sm mx-4 transform transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 text-white hover:text-cyan-400 transition-colors text-base font-medium px-4 py-2 bg-white/10 rounded-full hover:bg-white/20"
                >
                    Close ✕
                </button>

                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-2">
                            Connect to Unlock
                        </h2>
                        <p className="text-sm text-zinc-400">
                            Login with Telegram to access your profile, upgrade your plan, and track your doses.
                        </p>
                    </div>

                    <div className="flex justify-center mb-6" id="telegram-login-container">
                        <Script
                            src="https://telegram.org/js/telegram-widget.js?22"
                            strategy="afterInteractive"
                            onLoad={() => {
                                const script = document.createElement('script');
                                script.async = true;
                                script.src = 'https://telegram.org/js/telegram-widget.js?22';
                                script.setAttribute('data-telegram-login', 'based404official');
                                script.setAttribute('data-size', 'large');
                                script.setAttribute('data-onauth', 'onTelegramAuth(user)');
                                script.setAttribute('data-request-access', 'write');

                                const container = document.getElementById('telegram-login-container');
                                if (container) {
                                    container.innerHTML = '';
                                    container.appendChild(script);
                                }
                            }}
                        />
                    </div>

                    <p className="text-xs text-zinc-500 text-center">
                        Connect your Telegram account to unlock biological override states
                    </p>
                </div>
            </div>
        </div>
    );
}
