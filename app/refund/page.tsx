export default function RefundPolicy() {
    return (
        <div className="min-h-screen bg-black text-white py-20 px-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>
                <p className="text-zinc-400 mb-4">Last updated: January 18, 2026</p>

                <div className="space-y-6 text-zinc-300">
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">7-Day Money-Back Guarantee</h2>
                        <p>We offer a full refund within 7 days of your first payment. No questions asked.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">How to Request a Refund</h2>
                        <p>To request a refund:</p>
                        <ol className="list-decimal pl-6 mt-2 space-y-2">
                            <li>Contact us via Telegram: @based404official</li>
                            <li>Provide your account email and reason for refund</li>
                            <li>Refund will be processed within 3-5 business days</li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">Eligibility</h2>
                        <p>Refunds are available for:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>First-time payments within 7 days</li>
                            <li>Technical issues preventing service use</li>
                            <li>Accidental duplicate charges</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">Non-Refundable</h2>
                        <p>Refunds are NOT available for:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Requests made after 7 days</li>
                            <li>FREE plan users (no payment made)</li>
                            <li>Violations of Terms of Service</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">Processing Time</h2>
                        <p>Approved refunds are processed to your original payment method within 3-5 business days. Bank processing may take an additional 5-10 days.</p>
                    </section>
                </div>

                <div className="mt-12">
                    <a href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">← Back to Home</a>
                </div>
            </div>
        </div>
    );
}
