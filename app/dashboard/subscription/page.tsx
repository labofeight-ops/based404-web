'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Link from 'next/link';

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
        FREE: {
            name: 'FREE',
            price: '$0',
            period: 'forever',
            doses: '10 doses/day',
            features: ['1 agent (C-100)', 'Basic memory', 'Limited access'],
            color: 'zinc'
        },
        DOSED: {
            name: 'DOSED',
            price: '$9.99',
            period: '/month',
            doses: '250 doses/day',
            features: ['All 3 agents', 'Blend Mode', 'Web search', 'Full memory', 'Priority support'],
            color: 'cyan'
        },
        OVERDOSED: {
            name: 'OVERDOSED',
            price: '$29.99',
            period: '/month',
            doses: 'Unlimited',
            features: ['Everything in DOSED', 'No limits', 'API access', 'Custom agents', 'Dedicated support'],
            color: 'purple'
        }
    };

    const currentPlanKey = user?.subscription?.toUpperCase() || 'FREE';
    const currentPlan = plans[currentPlanKey as keyof typeof plans] || plans.FREE;

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-cyan-400 animate-pulse">Loading your subscription...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />

            <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-24 pb-16">
                <h1 className="text-4xl font-black tracking-tight mb-2">Your Plan</h1>
                <p className="text-zinc-400 mb-12">Manage your subscription, billing, and take control.</p>

                {/* Current Plan Card */}
                <div className={`bg-zinc-950 border rounded-2xl p-8 mb-8 ${currentPlanKey === 'OVERDOSED' ? 'border-purple-500/50' :
                        currentPlanKey === 'DOSED' ? 'border-cyan-500/50' : 'border-zinc-800'
                    }`}>
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <p className="text-zinc-500 text-sm mb-1">You're on</p>
                            <h2 className={`text-4xl font-black ${currentPlanKey === 'OVERDOSED' ? 'text-purple-400' :
                                    currentPlanKey === 'DOSED' ? 'text-cyan-400' : 'text-white'
                                }`}>
                                {currentPlan.name}
                            </h2>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold">{currentPlan.price}</p>
                            <p className="text-sm text-zinc-500">{currentPlan.period}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-zinc-900/50 rounded-xl p-4">
                            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Daily allowance</p>
                            <p className="text-xl font-bold">{currentPlan.doses}</p>
                        </div>
                        <div className="bg-zinc-900/50 rounded-xl p-4">
                            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Next billing</p>
                            <p className="text-xl font-bold">{currentPlanKey === 'FREE' ? 'Never' : 'Feb 20, 2026'}</p>
                        </div>
                    </div>

                    <div className="mb-8">
                        <p className="text-zinc-500 text-xs uppercase tracking-wider mb-3">What you get</p>
                        <div className="flex flex-wrap gap-2">
                            {currentPlan.features.map((feature, i) => (
                                <span key={i} className="px-3 py-1.5 bg-zinc-800 rounded-full text-sm">
                                    {feature}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Upgrade/Downgrade Actions */}
                    <div className="flex flex-wrap gap-3 pt-6 border-t border-zinc-800">
                        {currentPlanKey === 'FREE' && (
                            <>
                                <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-medium transition-colors">
                                    Upgrade to DOSED — $9.99/mo
                                </button>
                                <button className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-medium transition-colors">
                                    Go OVERDOSED — $29.99/mo
                                </button>
                            </>
                        )}
                        {currentPlanKey === 'DOSED' && (
                            <>
                                <button className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-medium transition-colors">
                                    Level up to OVERDOSED
                                </button>
                                <button className="px-6 py-3 border border-zinc-700 hover:bg-zinc-800 rounded-lg font-medium transition-colors text-zinc-400">
                                    Downgrade to FREE
                                </button>
                            </>
                        )}
                        {currentPlanKey === 'OVERDOSED' && (
                            <button className="px-6 py-3 border border-zinc-700 hover:bg-zinc-800 rounded-lg font-medium transition-colors text-zinc-400">
                                Downgrade to DOSED
                            </button>
                        )}
                    </div>
                </div>

                {/* Choose Your Dose - Plan Comparison */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-2">Choose your dose</h2>
                    <p className="text-zinc-500 mb-8">Find the plan that matches your appetite.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Object.entries(plans).map(([key, plan]) => (
                            <div
                                key={key}
                                className={`p-6 rounded-xl border transition-all ${currentPlanKey === key
                                        ? key === 'OVERDOSED' ? 'border-purple-500 bg-purple-500/5' :
                                            key === 'DOSED' ? 'border-cyan-500 bg-cyan-500/5' : 'border-zinc-600 bg-zinc-900/50'
                                        : 'border-zinc-800 hover:border-zinc-700'
                                    }`}
                            >
                                {currentPlanKey === key && (
                                    <span className="text-xs bg-white text-black px-2 py-1 rounded-full font-medium mb-3 inline-block">
                                        Current
                                    </span>
                                )}
                                <h3 className={`text-2xl font-black mb-1 ${key === 'OVERDOSED' ? 'text-purple-400' :
                                        key === 'DOSED' ? 'text-cyan-400' : ''
                                    }`}>
                                    {plan.name}
                                </h3>
                                <p className="text-2xl font-bold mb-1">{plan.price}<span className="text-sm text-zinc-500">{plan.period}</span></p>
                                <p className="text-sm text-zinc-500 mb-4">{plan.doses}</p>
                                <ul className="space-y-2">
                                    {plan.features.map((f, i) => (
                                        <li key={i} className="text-sm text-zinc-400 flex items-center gap-2">
                                            <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment Method */}
                {currentPlanKey !== 'FREE' && (
                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 mb-8">
                        <h2 className="text-xl font-bold mb-6">Payment method</h2>

                        <div className="flex items-center gap-4 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800 mb-4">
                            <div className="w-14 h-10 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                                VISA
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">•••• •••• •••• 4242</p>
                                <p className="text-sm text-zinc-500">Expires 12/28</p>
                            </div>
                            <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full">Default</span>
                        </div>

                        <div className="flex gap-3">
                            <button className="px-4 py-2 text-sm border border-zinc-700 hover:bg-zinc-800 rounded-lg transition-colors">
                                Update card
                            </button>
                            <button className="px-4 py-2 text-sm border border-zinc-700 hover:bg-zinc-800 rounded-lg transition-colors">
                                Add new card
                            </button>
                        </div>
                    </div>
                )}

                {/* Billing History */}
                {currentPlanKey !== 'FREE' && (
                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 mb-8">
                        <h2 className="text-xl font-bold mb-6">Billing history</h2>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-sm text-zinc-500 border-b border-zinc-800">
                                        <th className="pb-4 font-medium">Date</th>
                                        <th className="pb-4 font-medium">Description</th>
                                        <th className="pb-4 font-medium">Amount</th>
                                        <th className="pb-4 font-medium">Status</th>
                                        <th className="pb-4 font-medium"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-zinc-800/50">
                                        <td className="py-4 text-sm">Jan 20, 2026</td>
                                        <td className="py-4 text-sm">{currentPlan.name} Monthly</td>
                                        <td className="py-4 text-sm">{currentPlan.price}</td>
                                        <td className="py-4">
                                            <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400">Paid</span>
                                        </td>
                                        <td className="py-4">
                                            <button className="text-cyan-400 text-sm hover:underline">Download</button>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-zinc-800/50">
                                        <td className="py-4 text-sm">Dec 20, 2025</td>
                                        <td className="py-4 text-sm">{currentPlan.name} Monthly</td>
                                        <td className="py-4 text-sm">{currentPlan.price}</td>
                                        <td className="py-4">
                                            <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400">Paid</span>
                                        </td>
                                        <td className="py-4">
                                            <button className="text-cyan-400 text-sm hover:underline">Download</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Cancel Section */}
                {currentPlanKey !== 'FREE' && (
                    <div className="bg-zinc-950 border border-red-900/30 rounded-2xl p-8">
                        <h2 className="text-xl font-bold text-red-400 mb-2">Done with us?</h2>
                        <p className="text-zinc-500 mb-6">
                            Cancel and you'll keep access until your current period ends.
                            Your data sticks around if you change your mind. No hard feelings.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <button className="px-5 py-2.5 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors text-sm">
                                Cancel subscription
                            </button>
                            <button className="px-5 py-2.5 border border-zinc-700 text-zinc-400 rounded-lg hover:bg-zinc-800 transition-colors text-sm">
                                Pause instead
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
