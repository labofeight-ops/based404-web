'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Link from 'next/link';

interface BillingHistory {
    date: string;
    description: string;
    amount: string;
    status: 'paid' | 'pending' | 'failed';
}

export default function SubscriptionPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Mock billing history - in production this would come from Stripe/DB
    const billingHistory: BillingHistory[] = [
        { date: '2026-01-20', description: 'DOSED Monthly Plan', amount: '$9.99', status: 'paid' },
        { date: '2025-12-20', description: 'DOSED Monthly Plan', amount: '$9.99', status: 'paid' },
    ];

    useEffect(() => {
        const sessionToken = localStorage.getItem('session_token');
        const userData = localStorage.getItem('user');

        if (!sessionToken || !userData) {
            router.push('/');
            return;
        }

        try {
            setUser(JSON.parse(userData));
        } catch (e) {
            router.push('/');
        }
        setLoading(false);
    }, [router]);

    const getPlanDetails = (plan: string) => {
        switch (plan?.toUpperCase()) {
            case 'DOSED':
                return {
                    name: 'DOSED',
                    price: '$9.99/month',
                    credits: '250 doses/day',
                    features: ['All 3 agents', 'Blend Mode', 'Web Search', 'Memory', 'Priority Support']
                };
            case 'OVERDOSED':
                return {
                    name: 'OVERDOSED',
                    price: '$29.99/month',
                    credits: 'Unlimited doses',
                    features: ['Everything in DOSED', 'Unlimited usage', 'Custom agents', 'API Access', 'Dedicated Support']
                };
            default:
                return {
                    name: 'FREE',
                    price: '$0',
                    credits: '10 doses/day',
                    features: ['1 agent (C-100)', 'Basic chat', 'Limited memory']
                };
        }
    };

    const currentPlan = getPlanDetails(user?.subscription);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />

            <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-24 pb-16">
                <h1 className="text-4xl font-black tracking-tight mb-2">Subscription</h1>
                <p className="text-zinc-400 mb-12">Manage your plan, billing, and payment methods</p>

                {/* Current Plan */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold">Current Plan</h2>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${currentPlan.name === 'FREE' ? 'bg-zinc-700' :
                                currentPlan.name === 'DOSED' ? 'bg-cyan-500/20 text-cyan-400' :
                                    'bg-purple-500/20 text-purple-400'
                            }`}>
                            {currentPlan.name}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <p className="text-zinc-400 text-sm mb-1">Plan</p>
                            <p className="text-2xl font-bold">{currentPlan.name}</p>
                        </div>
                        <div>
                            <p className="text-zinc-400 text-sm mb-1">Price</p>
                            <p className="text-2xl font-bold">{currentPlan.price}</p>
                        </div>
                        <div>
                            <p className="text-zinc-400 text-sm mb-1">Credits</p>
                            <p className="text-lg">{currentPlan.credits}</p>
                        </div>
                        <div>
                            <p className="text-zinc-400 text-sm mb-1">Next Billing Date</p>
                            <p className="text-lg">{currentPlan.name === 'FREE' ? 'N/A' : 'Feb 20, 2026'}</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <p className="text-zinc-400 text-sm mb-2">Features included:</p>
                        <ul className="grid grid-cols-2 gap-2">
                            {currentPlan.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm">
                                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Plan Actions */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-zinc-800">
                        {currentPlan.name === 'FREE' && (
                            <Link href="/#pricing" className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-medium transition-colors">
                                Upgrade to DOSED
                            </Link>
                        )}
                        {currentPlan.name === 'DOSED' && (
                            <>
                                <Link href="/#pricing" className="px-6 py-2.5 bg-purple-500 hover:bg-purple-600 rounded-lg font-medium transition-colors">
                                    Upgrade to OVERDOSED
                                </Link>
                                <button className="px-6 py-2.5 border border-zinc-700 hover:bg-zinc-800 rounded-lg font-medium transition-colors">
                                    Downgrade to FREE
                                </button>
                            </>
                        )}
                        {currentPlan.name === 'OVERDOSED' && (
                            <button className="px-6 py-2.5 border border-zinc-700 hover:bg-zinc-800 rounded-lg font-medium transition-colors">
                                Downgrade to DOSED
                            </button>
                        )}
                    </div>
                </div>

                {/* Payment Method */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 mb-6">
                    <h2 className="text-xl font-bold mb-6">Payment Method</h2>

                    {currentPlan.name === 'FREE' ? (
                        <p className="text-zinc-500">No payment method required for free plan</p>
                    ) : (
                        <>
                            <div className="flex items-center gap-4 p-4 bg-zinc-900 rounded-lg mb-4">
                                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white font-bold text-xs">
                                    VISA
                                </div>
                                <div>
                                    <p className="font-medium">Visa ending in 4242</p>
                                    <p className="text-sm text-zinc-500">Expires 12/2028</p>
                                </div>
                                <div className="ml-auto">
                                    <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded">Default</span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button className="px-4 py-2 text-sm border border-zinc-700 hover:bg-zinc-800 rounded-lg transition-colors">
                                    Update Card
                                </button>
                                <button className="px-4 py-2 text-sm border border-zinc-700 hover:bg-zinc-800 rounded-lg transition-colors">
                                    Add New Card
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* Billing History */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 mb-6">
                    <h2 className="text-xl font-bold mb-6">Billing History</h2>

                    {currentPlan.name === 'FREE' ? (
                        <p className="text-zinc-500">No billing history for free plan</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-sm text-zinc-500 border-b border-zinc-800">
                                        <th className="pb-3">Date</th>
                                        <th className="pb-3">Description</th>
                                        <th className="pb-3">Amount</th>
                                        <th className="pb-3">Status</th>
                                        <th className="pb-3">Invoice</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {billingHistory.map((item, i) => (
                                        <tr key={i} className="border-b border-zinc-800/50">
                                            <td className="py-4 text-sm">{item.date}</td>
                                            <td className="py-4 text-sm">{item.description}</td>
                                            <td className="py-4 text-sm">{item.amount}</td>
                                            <td className="py-4">
                                                <span className={`text-xs px-2 py-1 rounded ${item.status === 'paid' ? 'bg-green-500/10 text-green-500' :
                                                        item.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                                                            'bg-red-500/10 text-red-500'
                                                    }`}>
                                                    {item.status.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="py-4">
                                                <button className="text-cyan-400 text-sm hover:underline">Download</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Cancel Subscription */}
                {currentPlan.name !== 'FREE' && (
                    <div className="bg-zinc-950 border border-red-900/30 rounded-2xl p-6">
                        <h2 className="text-xl font-bold text-red-400 mb-4">Cancel Subscription</h2>
                        <p className="text-zinc-400 text-sm mb-4">
                            If you cancel, you'll lose access to premium features at the end of your current billing period.
                            Your data will be preserved and you can re-subscribe anytime.
                        </p>
                        <div className="flex gap-3">
                            <button className="px-4 py-2 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors text-sm">
                                Cancel Subscription
                            </button>
                            <button className="px-4 py-2 border border-zinc-700 text-zinc-400 rounded-lg hover:bg-zinc-800 transition-colors text-sm">
                                Pause Instead (Keep Data)
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
