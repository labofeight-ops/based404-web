export default function TestPage() {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">✅ DEPLOYMENT TEST</h1>
                <p className="text-xl text-green-400 mb-2">Deployed successfully!</p>
                <p className="text-zinc-400">Version: 2026-01-18 12:50 (Gradients + Fixed Login)</p>
                <div className="mt-8 space-y-4">
                    <a href="/dashboard-preview" className="block text-blue-400 hover:underline">
                        → Test Dashboard Preview
                    </a>
                    <a href="/" className="block text-blue-400 hover:underline">
                        → Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
}
