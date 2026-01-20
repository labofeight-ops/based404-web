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
            case 'OVERDOSED': return 600;
            default: return 10;
        }
    };

    const limit = getLimit(user?.subscription);
    const creditsRemaining = user?.credits ?? limit;
    const creditsUsed = limit - creditsRemaining;
    const usagePercent = Math.min((creditsUsed / limit) * 100, 100);

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
                <h1 className="text-4xl font-black tracking-tight mb-2">Usage</h1>
                <p className="text-zinc-400 mb-12">Your doses. Your data.</p>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                        <p className="text-zinc-500 text-sm mb-1">Used today</p>
                        <p className="text-4xl font-black">{creditsUsed}</p>
                    </div>
                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                        <p className="text-zinc-500 text-sm mb-1">Remaining</p>
                        <p className="text-4xl font-black text-cyan-400">{creditsRemaining}</p>
                    </div>
                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                        <p className="text-zinc-500 text-sm mb-1">Daily limit</p>
                        <p className="text-4xl font-black">{limit}</p>
                        <p className="text-xs text-zinc-600 mt-1">{user?.subscription || 'FREE'} plan</p>
                    </div>
                </div>

                {/* Progress */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 mb-8">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-zinc-400">Today's usage</span>
                        <span className={`text-sm font-bold ${usagePercent > 90 ? 'text-red-400' :
                                usagePercent > 70 ? 'text-yellow-400' : 'text-cyan-400'
                            }`}>
                            {Math.round(usagePercent)}%
                        </span>
                    </div>
                    <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-700 rounded-full ${usagePercent > 90 ? 'bg-red-500' :
                                    usagePercent > 70 ? 'bg-yellow-500' :
                                        'bg-cyan-500'
                                }`}
                            style={{ width: `${usagePercent}%` }}
                        />
                    </div>
                    <p className="text-xs text-zinc-600 mt-3">Resets at midnight UTC</p>
                </div>

                {/* Upgrade CTA */}
                {user?.subscription?.toUpperCase() !== 'OVERDOSED' && (
                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                        <p className="font-bold mb-2">Need more?</p>
                        <p className="text-sm text-zinc-500 mb-4">
                            {user?.subscription?.toUpperCase() === 'DOSED'
                                ? 'OVERDOSED: 600 doses/day'
                                : 'DOSED: 250 doses/day • OVERDOSED: 600 doses/day'}
                        </p>
                        <a href="/dashboard/subscription" className="inline-block px-5 py-2.5 bg-white text-black rounded-lg font-medium hover:bg-zinc-200 transition-colors">
                            View plans
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
