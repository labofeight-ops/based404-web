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

    const plans = {
        FREE: { name: 'FREE', price: '$0', doses: '10/day', features: ['1 agent', 'Basic chat'] },
        DOSED: { name: 'DOSED', price: '$9.99/mo', doses: '250/day', features: ['All agents', 'Blend Mode', 'Web search', 'Memory', 'Reminders'] },
        OVERDOSED: { name: 'OVERDOSED', price: '$29.99/mo', doses: '600/day', features: ['Everything in DOSED', 'Priority responses', 'API access'] }
    };

    const currentPlanKey = user?.subscription?.toUpperCase() || 'FREE';
    const currentPlan = plans[currentPlanKey as keyof typeof plans] || plans.FREE;

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

            <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-24 pb-16">
                <h1 className="text-4xl font-black tracking-tight mb-2">Subscription</h1>
                <p className="text-zinc-400 mb-12">Your plan. Your rules.</p>

                {/* Current Plan */}
                <div className={`bg-zinc-950 border rounded-2xl p-8 mb-8 ${currentPlanKey === 'OVERDOSED' ? 'border-purple-500/50' :
                        currentPlanKey === 'DOSED' ? 'border-cyan-500/50' : 'border-zinc-800'
                    }`}>
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <p className="text-zinc-500 text-sm mb-1">Current plan</p>
                            <h2 className={`text-4xl font-black ${currentPlanKey === 'OVERDOSED' ? 'text-purple-400' :
                                    currentPlanKey === 'DOSED' ? 'text-cyan-400' : ''
                                }`}>
                                {currentPlan.name}
                            </h2>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold">{currentPlan.price}</p>
                            <p className="text-sm text-zinc-500">{currentPlan.doses}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {currentPlan.features.map((f, i) => (
                            <span key={i} className="px-3 py-1.5 bg-zinc-800 rounded-full text-sm">{f}</span>
                        ))}
                    </div>

                    {currentPlanKey !== 'FREE' && (
                        <p className="text-sm text-zinc-500">Next billing: Feb 20, 2026</p>
                    )}
                </div>

                {/* Choose Your Dose */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-6">Choose your dose</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Object.entries(plans).map(([key, plan]) => (
                            <div
                                key={key}
                                className={`p-6 rounded-xl border transition-all ${currentPlanKey === key
                                        ? key === 'OVERDOSED' ? 'border-purple-500 bg-purple-500/5' :
                                            key === 'DOSED' ? 'border-cyan-500 bg-cyan-500/5' : 'border-zinc-600'
                                        : 'border-zinc-800 hover:border-zinc-700'
                                    }`}
                            >
                                {currentPlanKey === key && (
                                    <span className="text-xs bg-white text-black px-2 py-1 rounded-full font-medium mb-3 inline-block">Current</span>
                                )}
                                <h3 className={`text-xl font-black mb-1 ${key === 'OVERDOSED' ? 'text-purple-400' :
                                        key === 'DOSED' ? 'text-cyan-400' : ''
                                    }`}>
                                    {plan.name}
                                </h3>
                                <p className="text-xl font-bold">{plan.price}</p>
                                <p className="text-sm text-zinc-500 mb-4">{plan.doses}</p>

                                {currentPlanKey !== key && (
                                    <button className={`w-full py-2.5 rounded-lg font-medium text-sm transition-colors ${key === 'OVERDOSED' ? 'bg-purple-500 hover:bg-purple-600' :
                                            key === 'DOSED' ? 'bg-cyan-500 hover:bg-cyan-600 text-black' :
                                                'bg-zinc-700 hover:bg-zinc-600'
                                        }`}>
                                        {key === 'FREE' ? 'Downgrade' : 'Upgrade'}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment & Billing - Only for paid */}
                {currentPlanKey !== 'FREE' && (
                    <>
                        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 mb-8">
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

                        <div className="bg-zinc-950 border border-red-900/30 rounded-2xl p-8">
                            <h2 className="text-xl font-bold text-red-400 mb-2">Cancel</h2>
                            <p className="text-zinc-500 text-sm mb-4">Keep access until your period ends. Come back anytime.</p>
                            <button className="px-4 py-2 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors text-sm">
                                Cancel subscription
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
