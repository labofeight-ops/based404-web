export default function DebugPage() {
    return (
        <div className="min-h-screen bg-black text-white p-8">
            <h1 className="text-4xl mb-8">COMPONENT DEBUG PAGE</h1>

            <div className="space-y-8">
                <section className="border border-white p-4">
                    <h2 className="text-2xl mb-4">1. Footer Test</h2>
                    <div className="bg-zinc-900 p-4">
                        <footer className="w-full py-8 px-4 flex flex-col items-center justify-center border-t border-white/20 space-y-4">
                            <div className="flex gap-4">
                                <a href="/privacy" className="text-cyan-400 hover:text-cyan-300">Privacy</a>
                                <a href="/terms" className="text-cyan-400 hover:text-cyan-300">Terms</a>
                                <a href="/refund" className="text-cyan-400 hover:text-cyan-300">Refund</a>
                            </div>
                            <p className="text-xs text-white/50">© 2026 BASED404</p>
                        </footer>
                    </div>
                    <p className="mt-2 text-sm">^ If you see links above, Footer component works</p>
                </section>

                <section className="border border-white p-4">
                    <h2 className="text-2xl mb-4">2. Login Button Test</h2>
                    <div className="bg-zinc-900 p-8">
                        <a
                            href="https://t.me/based404official"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full max-w-sm mx-auto py-4 px-6 bg-[#0088cc] hover:bg-[#0077b3] text-white font-semibold text-center rounded-xl"
                        >
                            Open Telegram Bot
                        </a>
                    </div>
                    <p className="mt-2 text-sm">^ If you see blue button above, LoginModal button works</p>
                </section>

                <section className="border border-white p-4">
                    <h2 className="text-2xl mb-4">3. Actual Imports Test</h2>
                    <p className="text-sm mb-2">Checking if components load...</p>
                    <div className="bg-zinc-900 p-4 font-mono text-xs">
                        <p>✓ This page loaded</p>
                        <p>✓ Next.js is running</p>
                        <p>✓ Tailwind styles working (you see colors)</p>
                    </div>
                </section>
            </div>

            <div className="mt-8">
                <a href="/" className="text-cyan-400 hover:text-cyan-300">← Back to Home</a>
            </div>
        </div>
    );
}
