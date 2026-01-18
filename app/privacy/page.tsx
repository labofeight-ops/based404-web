export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-black text-white py-20 px-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                <p className="text-zinc-400 mb-4">Last updated: January 18, 2026</p>

                <div className="space-y-6 text-zinc-300">
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">1. Information We Collect</h2>
                        <p>When you use BASED404, we collect:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Telegram account information (ID, username, name)</li>
                            <li>Usage data (doses consumed, agent preferences)</li>
                            <li>Payment information (processed securely via Stripe)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">2. How We Use Your Data</h2>
                        <p>We use your information to:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Provide and improve our AI services</li>
                            <li>Process payments and manage subscriptions</li>
                            <li>Send important updates about your account</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">3. Data Security</h2>
                        <p>We implement industry-standard security measures to protect your data. All conversations are encrypted and we never sell your personal information to third parties.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">4. Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Access your personal data</li>
                            <li>Request data deletion</li>
                            <li>Opt-out of marketing communications</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">5. Contact Us</h2>
                        <p>For privacy-related questions, contact us via Telegram: @based404official</p>
                    </section>
                </div>

                <div className="mt-12">
                    <a href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">← Back to Home</a>
                </div>
            </div>
        </div>
    );
}
