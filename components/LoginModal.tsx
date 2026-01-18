'use client';

import { useEffect } from 'react';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    useEffect(() => {
        if (isOpen) {
            // Load Telegram widget when modal opens
            const container = document.getElementById('telegram-login-widget');
            if (container && container.children.length === 0) {
                const script = document.createElement('script');
                script.src = 'https://telegram.org/js/telegram-widget.js?22';
                script.setAttribute('data-telegram-login', 'based404official');
                script.setAttribute('data-size', 'large');
                script.setAttribute('data-auth-url', `${window.location.origin}/api/auth/telegram`);
                script.setAttribute('data-request-access', 'write');
                script.async = true;
                container.appendChild(script);
            }
        }
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
                            Connect to Unlock
                        </h2>
                        <p className="text-sm text-zinc-400">
                            Login with Telegram to access your profile, upgrade your plan, and track your doses.
                        </p>
                    </div>

                    <div id="telegram-login-widget" className="flex justify-center mb-6"></div>

                    <p className="text-xs text-zinc-500 text-center">
                        Connect your Telegram account to unlock biological override states
                    </p>
                </div>
            </div>
        </div>
    );
}
