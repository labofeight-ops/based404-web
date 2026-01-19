'use client';

import { useEffect, useRef } from 'react';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

declare global {
    interface Window {
        TelegramLoginWidget: {
            dataOnauth: (user: TelegramUser) => void;
        };
    }
}

interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
    auth_date: number;
    hash: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen || !containerRef.current) return;

        // Clear any existing widget
        containerRef.current.innerHTML = '';

        // Define callback for when user authenticates
        (window as any).onTelegramAuth = async (user: TelegramUser) => {
            console.log('Telegram auth received:', user);

            try {
                // Send to our backend to verify and create session
                const res = await fetch('/api/auth/telegram', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user)
                });

                console.log('Auth API response status:', res.status);
                const data = await res.json();
                console.log('Auth API response data:', data);

                if (data.success) {
                    // Store session
                    localStorage.setItem('session_token', data.sessionToken);
                    localStorage.setItem('user', JSON.stringify(data.user));

                    console.log('Session stored successfully');

                    // Close modal
                    onClose();

                    // Small delay then redirect to dashboard
                    setTimeout(() => {
                        window.location.href = '/dashboard';
                    }, 300);
                } else {
                    console.error('Auth failed:', data.error);
                    alert('Authentication failed: ' + data.error);
                }
            } catch (error) {
                console.error('Auth error:', error);
                alert('Authentication failed. Please try again.');
            }
        };

        // Create Telegram Login Widget
        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?22';
        script.setAttribute('data-telegram-login', 'BASED404BOT');
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-radius', '10');
        script.setAttribute('data-onauth', 'onTelegramAuth(user)');
        script.setAttribute('data-request-access', 'write');
        script.async = true;

        containerRef.current.appendChild(script);

        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-fadeIn"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-sm mx-4 animate-scaleIn"
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
                            Connect with Telegram
                        </h2>
                        <p className="text-sm text-zinc-400 mb-4">
                            Click the button below to login with your Telegram account
                        </p>
                    </div>

                    {/* Telegram Login Widget Container */}
                    <div
                        ref={containerRef}
                        className="flex justify-center items-center min-h-[60px]"
                    />

                    <p className="text-xs text-zinc-500 text-center mt-6">
                        Secure authentication powered by Telegram
                    </p>
                </div>
            </div>
        </div>
    );
}
