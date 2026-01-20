'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function UsagePage() {
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

    const getLimit = (plan: string) => {
        switch (plan?.toUpperCase()) {
            case 'DOSED': return 250;
            case 'OVERDOSED': return 999; // Show 999 instead of Infinity for UI
            default: return 10;
        }
    };

    // Use REAL data from user object
    const limit = getLimit(user?.subscription);
    const creditsRemaining = user?.credits ?? limit;
    const creditsUsed = limit - creditsRemaining;
    const usagePercent = Math.min((creditsUsed / limit) * 100, 100);
    const isUnlimited = user?.subscription?.toUpperCase() === 'OVERDOSED';

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-cyan-400 animate-pulse">Loading your stats...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />

            <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-24 pb-16">
                <h1 className="text-4xl font-black tracking-tight mb-2">Your Activity</h1>
                <p className="text-zinc-400 mb-12">Every dose counts. Here's where they went.</p>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {/* Doses Burned */}
                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                        <p className="text-zinc-500 text-sm mb-1">Doses burned today</p>
                        <p className="text-4xl font-black">{creditsUsed}</p>
                        <p className="text-xs text-zinc-600 mt-2">
                            {isUnlimited ? 'Go wild, no limits' : `out of ${limit} available`}
                        </p>
                    </div>

                    {/* Doses Left */}
                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                        <p className="text-zinc-500 text-sm mb-1">Doses left</p>
                        <p className={`text-4xl font-black ${isUnlimited ? 'text-purple-400' : 'text-cyan-400'}`}>
                            {isUnlimited ? '∞' : creditsRemaining}
                        </p>
                        <p className="text-xs text-zinc-600 mt-2">Refills at midnight UTC</p>
                    </div>

                    {/* Current Plan */}
                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                        <p className="text-zinc-500 text-sm mb-1">Your plan</p>
                        <p className={`text-4xl font-black ${user?.subscription?.toUpperCase() === 'OVERDOSED' ? 'text-purple-400' :
                                user?.subscription?.toUpperCase() === 'DOSED' ? 'text-cyan-400' : ''
                            }`}>
                            {user?.subscription || 'FREE'}
                        </p>
                        <p className="text-xs text-zinc-600 mt-2">
                            {isUnlimited ? 'Unlimited access' :
                                user?.subscription?.toUpperCase() === 'DOSED' ? '250 doses/day' :
                                    '10 doses/day'}
                        </p>
                    </div>
                </div>

                {/* Progress Bar - Only show for limited plans */}
                {!isUnlimited && (
                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 mb-8">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm text-zinc-400">Today's consumption</span>
                            <span className={`text-sm font-bold ${usagePercent > 90 ? 'text-red-400' :
                                    usagePercent > 70 ? 'text-yellow-400' : 'text-cyan-400'
                                }`}>
                                {Math.round(usagePercent)}% used
                            </span>
                        </div>
                        <div className="w-full h-4 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                                className={`h-full transition-all duration-700 rounded-full ${usagePercent > 90 ? 'bg-gradient-to-r from-red-600 to-red-400' :
                                        usagePercent > 70 ? 'bg-gradient-to-r from-yellow-600 to-yellow-400' :
                                            'bg-gradient-to-r from-cyan-600 to-cyan-400'
                                    }`}
                                style={{ width: `${usagePercent}%` }}
                            />
                        </div>
                        <p className="text-xs text-zinc-600 mt-3">
                            {usagePercent > 90 ? 'Running low. Consider an upgrade?' :
                                usagePercent > 70 ? 'Burning through doses. Keep going.' :
                                    'Plenty of room to play.'}
                        </p>
                    </div>
                )}

                {/* Agent Breakdown */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 mb-8">
                    <h2 className="text-xl font-bold mb-2">Who you've been vibing with</h2>
                    <p className="text-sm text-zinc-500 mb-6">Your agent usage breakdown</p>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800 text-center">
                            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <span className="text-xl">⚡</span>
                            </div>
                            <p className="text-2xl font-black text-blue-400">C-100</p>
                            <p className="text-xs text-zinc-500 mt-1">The hyper one</p>
                        </div>
                        <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800 text-center">
                            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-500/20 flex items-center justify-center">
                                <span className="text-xl">🌿</span>
                            </div>
                            <p className="text-2xl font-black text-green-400">THC-1</p>
                            <p className="text-xs text-zinc-500 mt-1">The chill one</p>
                        </div>
                        <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800 text-center">
                            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-pink-500/20 flex items-center justify-center">
                                <span className="text-xl">💕</span>
                            </div>
                            <p className="text-2xl font-black text-pink-400">MOLLY-X</p>
                            <p className="text-xs text-zinc-500 mt-1">The warm one</p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                    <h2 className="text-xl font-bold mb-2">Need more?</h2>
                    <p className="text-sm text-zinc-500 mb-6">
                        {isUnlimited ?
                            "You've got unlimited. You're set." :
                            "Running low on doses? We've got you."
                        }
                    </p>

                    {!isUnlimited && (
                        <div className="flex flex-wrap gap-3">
                            {user?.subscription?.toUpperCase() !== 'DOSED' && (
                                <a href="/dashboard/subscription" className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-medium transition-colors">
                                    Upgrade to DOSED — 250 doses/day
                                </a>
                            )}
                            {user?.subscription?.toUpperCase() !== 'OVERDOSED' && (
                                <a href="/dashboard/subscription" className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-medium transition-colors">
                                    Go OVERDOSED — Unlimited
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
