export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-black text-white py-20 px-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                <p className="text-zinc-400 mb-4">Last updated: January 18, 2026</p>

                <div className="space-y-6 text-zinc-300">
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
                        <p>By accessing BASED404, you agree to be bound by these Terms of Service. If you disagree with any part, you may not use our service.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">2. Use of Service</h2>
                        <p>You agree to:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Use BASED404 for lawful purposes only</li>
                            <li>Not abuse, harass, or harm other users</li>
                            <li>Not attempt to hack or exploit our systems</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">3. Subscription Plans</h2>
                        <p>BASED404 offers FREE, DOSED, and OVERDOSED tiers. Paid plans are billed monthly or annually. Beta pricing applies to early users.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">4. Termination</h2>
                        <p>We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">5. Disclaimer</h2>
                        <p>BASED404 is provided "as is" without warranties. We are not liable for any damages arising from use of our service.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">6. Contact</h2>
                        <p>Questions about Terms? Contact us: @BASED404BOT</p>
                    </section>
                </div>

                <div className="mt-12">
                    <a href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">← Back to Home</a>
                </div>
            </div>
        </div>
    );
}
