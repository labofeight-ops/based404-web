'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function SubscriptionPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const sessionToken = localStorage.getItem('session_token');
            if (!sessionToken) {
                router.push('/');
                return;
            }

            try {
                const res = await fetch('/api/user/me', {
                    headers: { 'Authorization': `Bearer ${sessionToken}` }
                });
                const data = await res.json();
                if (data.error) {
                    router.push('/');
                    return;
                }
                setUser(data);
            } catch (e) {
                router.push('/');
            }
            setLoading(false);
        };
        fetchUser();
    }, [router]);

    const currentPlan = user?.subscription?.toUpperCase() || 'FREE';
    const planRank = { 'FREE': 0, 'DOSED': 1, 'OVERDOSED': 2 };
    const currentRank = planRank[currentPlan as keyof typeof planRank] || 0;

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-cyan-400 animate-pulse">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />

            <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-24 pb-16">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-black tracking-tight mb-4">Choose Your Dose</h1>
                    <p className="text-zinc-400 text-lg">Cancel ChatGPT. This hits different.</p>
                </div>

                {/* Plan Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

                    {/* FREE */}
                    <div className={`rounded-3xl border-2 p-8 ${currentPlan === 'FREE' ? 'border-zinc-500 bg-zinc-900/50' : 'border-zinc-800'}`}>
                        {currentPlan === 'FREE' && <span className="text-xs bg-zinc-600 px-3 py-1 rounded-full mb-4 inline-block">Current</span>}
                        <h3 className="text-3xl font-black mb-2">FREE</h3>
                        <div className="mb-4">
                            <span className="text-4xl font-black">$0</span>
                        </div>
                        <p className="text-zinc-400 text-sm mb-6">Taste the vibe. See if you're ready.</p>

                        <ul className="space-y-3 mb-8 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-zinc-500">✓</span>
                                <span>10 doses/day</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-zinc-500">✓</span>
                                <span>1 agent (C-100)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-zinc-500">✓</span>
                                <span>Basic responses</span>
                            </li>
                            <li className="flex items-start gap-2 text-zinc-600">
                                <span>✗</span>
                                <span>No web search</span>
                            </li>
                            <li className="flex items-start gap-2 text-zinc-600">
                                <span>✗</span>
                                <span>No memory</span>
                            </li>
                            <li className="flex items-start gap-2 text-zinc-600">
                                <span>✗</span>
                                <span>No reminders</span>
                            </li>
                        </ul>

                        {currentRank > 0 && (
                            <button className="w-full py-3 border border-zinc-700 rounded-xl text-zinc-400 hover:bg-zinc-800 transition-colors">
                                Downgrade
                            </button>
                        )}
                    </div>

                    {/* DOSED */}
                    <div className={`rounded-3xl border-2 p-8 relative ${currentPlan === 'DOSED' ? 'border-cyan-500 bg-cyan-500/5' : 'border-cyan-500/50'}`}>
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 px-4 py-1 rounded-full">
                            <span className="text-black text-xs font-bold">MOST POPULAR</span>
                        </div>
                        {currentPlan === 'DOSED' && <span className="text-xs bg-cyan-500 text-black px-3 py-1 rounded-full mb-4 inline-block">Current</span>}
                        <h3 className="text-3xl font-black text-cyan-400 mb-2">DOSED</h3>
                        <div className="mb-1">
                            <span className="text-4xl font-black">$19</span>
                            <span className="text-zinc-400">/month</span>
                        </div>
                        <p className="text-xs text-zinc-500 mb-4">or $149/year (save 35%)</p>
                        <p className="text-zinc-400 text-sm mb-6">The full experience. Replace ChatGPT today.</p>

                        <ul className="space-y-3 mb-8 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-400">✓</span>
                                <span><strong>250 doses/day</strong></span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-400">✓</span>
                                <span><strong>All 3 agents</strong> — switch anytime</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-400">✓</span>
                                <span><strong>Blend Mode</strong> — 3 minds, 1 answer</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-400">✓</span>
                                <span><strong>Live web search</strong> — real-time data</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-400">✓</span>
                                <span><strong>Persistent memory</strong> — remembers you</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-400">✓</span>
                                <span><strong>Smart reminders</strong> — never forget</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-400">✓</span>
                                <span><strong>Personality learning</strong> — adapts to you</span>
                            </li>
                        </ul>

                        {currentRank < 1 && (
                            <button className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-xl transition-colors">
                                Get DOSED
                            </button>
                        )}
                        {currentRank > 1 && (
                            <button className="w-full py-3 border border-cyan-500 text-cyan-400 rounded-xl hover:bg-cyan-500/10 transition-colors">
                                Downgrade
                            </button>
                        )}
                    </div>

                    {/* OVERDOSED */}
                    <div className={`rounded-3xl border-2 p-8 ${currentPlan === 'OVERDOSED' ? 'border-purple-500 bg-purple-500/5' : 'border-purple-500/50'}`}>
                        {currentPlan === 'OVERDOSED' && <span className="text-xs bg-purple-500 px-3 py-1 rounded-full mb-4 inline-block">Current</span>}
                        <h3 className="text-3xl font-black text-purple-400 mb-2">OVERDOSED</h3>
                        <div className="mb-1">
                            <span className="text-4xl font-black">$39</span>
                            <span className="text-zinc-400">/month</span>
                        </div>
                        <p className="text-xs text-zinc-500 mb-4">or $299/year (save 36%)</p>
                        <p className="text-zinc-400 text-sm mb-6">Power users only. Maximum capacity.</p>

                        <ul className="space-y-3 mb-8 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-purple-400">✓</span>
                                <span><strong>600 doses/day</strong></span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-400">✓</span>
                                <span>Everything in DOSED</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-400">✓</span>
                                <span><strong>Priority responses</strong> — faster than fast</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-400">✓</span>
                                <span><strong>Early access</strong> — new agents first</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-400">✓</span>
                                <span><strong>API access</strong> — build with us</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-400">✓</span>
                                <span><strong>VIP support</strong> — we got you</span>
                            </li>
                        </ul>

                        {currentRank < 2 && (
                            <button className="w-full py-3 bg-purple-500 hover:bg-purple-600 font-bold rounded-xl transition-colors">
                                Go OVERDOSED
                            </button>
                        )}
                    </div>
                </div>

                {/* Billing Section for Paid Users */}
                {currentRank > 0 && (
                    <div className="space-y-6">
                        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                            <h2 className="text-xl font-bold mb-4">Payment method</h2>
                            <div className="flex items-center gap-4 p-4 bg-zinc-900/50 rounded-xl">
                                <div className="w-12 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">VISA</div>
                                <div>
                                    <p className="font-medium">•••• 4242</p>
                                    <p className="text-sm text-zinc-500">Expires 12/28</p>
                                </div>
                            </div>
                            <button className="mt-4 px-4 py-2 text-sm border border-zinc-700 rounded-lg hover:bg-zinc-800 transition-colors">
                                Update card
                            </button>
                        </div>

                        <div className="bg-zinc-950 border border-red-900/30 rounded-2xl p-6">
                            <h2 className="text-lg font-bold text-red-400 mb-2">Cancel subscription</h2>
                            <p className="text-zinc-500 text-sm mb-4">Keep access until your period ends.</p>
                            <button className="px-4 py-2 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors text-sm">
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
