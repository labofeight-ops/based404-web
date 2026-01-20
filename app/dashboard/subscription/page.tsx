'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function SubscriptionPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isYearly, setIsYearly] = useState(false);

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

    const prices = {
        DOSED: { monthly: 19, yearly: 149 },
        OVERDOSED: { monthly: 39, yearly: 299 }
    };

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
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black tracking-tight mb-2">Choose Your Dose</h1>
                    <p className="text-zinc-400">Cancel ChatGPT. This hits different.</p>
                </div>

                {/* Monthly/Yearly Toggle */}
                <div className="flex items-center justify-center gap-4 mb-10">
                    <span className={`text-sm font-medium ${!isYearly ? 'text-white' : 'text-zinc-500'}`}>Monthly</span>
                    <button
                        onClick={() => setIsYearly(!isYearly)}
                        className="relative w-14 h-7 rounded-full bg-zinc-800 transition-all"
                    >
                        <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${isYearly ? 'left-8' : 'left-1'}`} />
                    </button>
                    <span className={`text-sm font-medium ${isYearly ? 'text-white' : 'text-zinc-500'}`}>
                        Yearly <span className="text-cyan-400 text-xs ml-1">Save 35%</span>
                    </span>
                </div>

                {/* Plan Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                    {/* FREE */}
                    <div className={`rounded-2xl border p-6 ${currentPlan === 'FREE' ? 'border-zinc-500' : 'border-zinc-800'}`}>
                        {currentPlan === 'FREE' && <span className="text-xs bg-zinc-600 px-2 py-0.5 rounded-full mb-3 inline-block">Current</span>}
                        <h3 className="text-2xl font-black mb-1">FREE</h3>
                        <p className="text-3xl font-black mb-4">$0</p>

                        <ul className="space-y-2 mb-6 text-sm">
                            <li className="text-zinc-400">✓ 10 doses/day</li>
                            <li className="text-zinc-400">✓ 1 agent (C-100)</li>
                            <li className="text-zinc-600">✗ No web search</li>
                            <li className="text-zinc-600">✗ No memory</li>
                            <li className="text-zinc-600">✗ No reminders</li>
                        </ul>

                        {currentRank > 0 && (
                            <button className="w-full py-2.5 border border-zinc-700 rounded-lg text-sm text-zinc-400 hover:bg-zinc-800 transition-colors">
                                Downgrade
                            </button>
                        )}
                    </div>

                    {/* DOSED */}
                    <div className={`rounded-2xl border p-6 relative ${currentPlan === 'DOSED' ? 'border-cyan-500' : 'border-cyan-500/50'}`}>
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 px-3 py-0.5 rounded-full">
                            <span className="text-black text-xs font-bold">POPULAR</span>
                        </div>
                        {currentPlan === 'DOSED' && <span className="text-xs bg-cyan-500 text-black px-2 py-0.5 rounded-full mb-3 inline-block">Current</span>}
                        <h3 className="text-2xl font-black text-cyan-400 mb-1">DOSED</h3>
                        <p className="text-3xl font-black mb-1">
                            ${isYearly ? prices.DOSED.yearly : prices.DOSED.monthly}
                            <span className="text-sm text-zinc-400 font-normal">/{isYearly ? 'year' : 'mo'}</span>
                        </p>
                        {isYearly && <p className="text-xs text-zinc-500 mb-4">${Math.round(prices.DOSED.yearly / 12)}/mo billed yearly</p>}
                        {!isYearly && <p className="text-xs text-zinc-500 mb-4">or ${prices.DOSED.yearly}/year</p>}

                        <ul className="space-y-2 mb-6 text-sm">
                            <li><span className="text-cyan-400">✓</span> 250 doses/day</li>
                            <li><span className="text-cyan-400">✓</span> All 3 agents</li>
                            <li><span className="text-cyan-400">✓</span> Blend Mode</li>
                            <li><span className="text-cyan-400">✓</span> Live web search</li>
                            <li><span className="text-cyan-400">✓</span> Persistent memory</li>
                            <li><span className="text-cyan-400">✓</span> Smart reminders</li>
                            <li><span className="text-cyan-400">✓</span> Personality learning</li>
                        </ul>

                        {currentRank < 1 && (
                            <button className="w-full py-2.5 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-colors">
                                Get DOSED
                            </button>
                        )}
                        {currentRank > 1 && (
                            <button className="w-full py-2.5 border border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-colors">
                                Downgrade
                            </button>
                        )}
                    </div>

                    {/* OVERDOSED */}
                    <div className={`rounded-2xl border p-6 ${currentPlan === 'OVERDOSED' ? 'border-purple-500' : 'border-purple-500/50'}`}>
                        {currentPlan === 'OVERDOSED' && <span className="text-xs bg-purple-500 px-2 py-0.5 rounded-full mb-3 inline-block">Current</span>}
                        <h3 className="text-2xl font-black text-purple-400 mb-1">OVERDOSED</h3>
                        <p className="text-3xl font-black mb-1">
                            ${isYearly ? prices.OVERDOSED.yearly : prices.OVERDOSED.monthly}
                            <span className="text-sm text-zinc-400 font-normal">/{isYearly ? 'year' : 'mo'}</span>
                        </p>
                        {isYearly && <p className="text-xs text-zinc-500 mb-4">${Math.round(prices.OVERDOSED.yearly / 12)}/mo billed yearly</p>}
                        {!isYearly && <p className="text-xs text-zinc-500 mb-4">or ${prices.OVERDOSED.yearly}/year</p>}

                        <ul className="space-y-2 mb-6 text-sm">
                            <li><span className="text-purple-400">✓</span> 600 doses/day</li>
                            <li><span className="text-purple-400">✓</span> Everything in DOSED</li>
                            <li><span className="text-purple-400">✓</span> Priority responses</li>
                            <li><span className="text-purple-400">✓</span> Early access</li>
                            <li><span className="text-purple-400">✓</span> API access</li>
                            <li><span className="text-purple-400">✓</span> VIP support</li>
                        </ul>

                        {currentRank < 2 && (
                            <button className="w-full py-2.5 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-colors">
                                Go OVERDOSED
                            </button>
                        )}
                    </div>
                </div>

                {/* Billing for Paid */}
                {currentRank > 0 && (
                    <div className="space-y-4">
                        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Payment: •••• 4242</p>
                                    <p className="text-sm text-zinc-500">Expires 12/28</p>
                                </div>
                                <button className="text-sm text-cyan-400 hover:underline">Update</button>
                            </div>
                        </div>
                        <button className="text-sm text-red-400 hover:underline">Cancel subscription</button>
                    </div>
                )}
            </div>
        </div>
    );
}
