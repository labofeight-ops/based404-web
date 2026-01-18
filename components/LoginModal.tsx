'use client';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    if (!isOpen) return null;

    const telegramBotLink = 'https://t.me/based404official';

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
                        <p className="text-sm text-zinc-400 mb-4">
                            Start using BASED404 by connecting with our Telegram bot.
                        </p>
                    </div>

                    <a
                        href={telegramBotLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-4 px-6 bg-[#0088cc] hover:bg-[#0077b3] text-white font-semibold text-center rounded-xl transition-all duration-200 mb-4"
                    >
                        Open Telegram Bot
                    </a>

                    <p className="text-xs text-zinc-500 text-center">
                        Click above to start chatting with BASED404 on Telegram
                    </p>
                </div>
            </div>
        </div>
    );
}
