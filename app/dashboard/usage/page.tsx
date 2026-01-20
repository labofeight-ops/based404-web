'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

interface UsageEntry {
    date: string;
    time: string;
    agent: string;
    credits: number;
    type: string;
}

export default function UsagePage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Mock usage data - in production this would come from DB
    const usageHistory: UsageEntry[] = [
        { date: 'Jan 20, 2026', time: '09:45 AM', agent: 'C-100', credits: 0.25, type: 'Chat message' },
        { date: 'Jan 20, 2026', time: '09:42 AM', agent: 'MOLLY-X', credits: 0.25, type: 'Chat message' },
        { date: 'Jan 20, 2026', time: '09:30 AM', agent: 'THC-1', credits: 0.50, type: 'Web search' },
        { date: 'Jan 19, 2026', time: '11:15 PM', agent: 'C-100', credits: 0.25, type: 'Chat message' },
        { date: 'Jan 19, 2026', time: '11:10 PM', agent: 'C-100', credits: 0.25, type: 'Chat message' },
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

    const getLimit = (plan: string) => {
        switch (plan?.toUpperCase()) {
            case 'DOSED': return 250;
            case 'OVERDOSED': return Infinity;
            default: return 10;
        }
    };

    const creditsUsed = user?.credits_used_today || 3.5;
    const limit = getLimit(user?.subscription);
    const creditsRemaining = user?.credits || (limit - creditsUsed);
    const usagePercent = limit === Infinity ? 0 : Math.min((creditsUsed / limit) * 100, 100);

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
                <h1 className="text-4xl font-black tracking-tight mb-2">Usage</h1>
                <p className="text-zinc-400 mb-12">Track your credit usage and activity</p>

                {/* Usage Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {/* Credits Used Today */}
                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                        <p className="text-zinc-400 text-sm mb-2">Credits Used Today</p>
                        <p className="text-3xl font-bold">{creditsUsed}</p>
                        <p className="text-sm text-zinc-500 mt-1">
                            of {limit === Infinity ? '∞' : limit} available
                        </p>
                    </div>

                    {/* Credits Remaining */}
                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                        <p className="text-zinc-400 text-sm mb-2">Credits Remaining</p>
                        <p className="text-3xl font-bold text-cyan-400">
                            {limit === Infinity ? '∞' : creditsRemaining}
                        </p>
                        <p className="text-sm text-zinc-500 mt-1">Resets at midnight UTC</p>
                    </div>

                    {/* Current Plan */}
                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                        <p className="text-zinc-400 text-sm mb-2">Current Plan</p>
                        <p className="text-3xl font-bold">{user?.subscription || 'FREE'}</p>
                        <p className="text-sm text-zinc-500 mt-1">
                            {limit === Infinity ? 'Unlimited usage' : `${limit} doses/day`}
                        </p>
                    </div>
                </div>

                {/* Usage Progress Bar */}
                {limit !== Infinity && (
                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 mb-8">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm text-zinc-400">Daily Usage</span>
                            <span className="text-sm font-medium">{usagePercent.toFixed(1)}%</span>
                        </div>
                        <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                                className={`h-full transition-all duration-500 ${usagePercent > 90 ? 'bg-red-500' :
                                        usagePercent > 70 ? 'bg-yellow-500' :
                                            'bg-cyan-500'
                                    }`}
                                style={{ width: `${usagePercent}%` }}
                            />
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-zinc-500">0</span>
                            <span className="text-xs text-zinc-500">{limit} doses</span>
                        </div>
                    </div>
                )}

                {/* Usage by Agent */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 mb-8">
                    <h2 className="text-xl font-bold mb-6">Usage by Agent</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-zinc-900 rounded-lg">
                            <p className="text-2xl font-bold text-blue-400">45%</p>
                            <p className="text-sm text-zinc-400 mt-1">C-100</p>
                        </div>
                        <div className="text-center p-4 bg-zinc-900 rounded-lg">
                            <p className="text-2xl font-bold text-green-400">30%</p>
                            <p className="text-sm text-zinc-400 mt-1">THC-1</p>
                        </div>
                        <div className="text-center p-4 bg-zinc-900 rounded-lg">
                            <p className="text-2xl font-bold text-pink-400">25%</p>
                            <p className="text-sm text-zinc-400 mt-1">MOLLY-X</p>
                        </div>
                    </div>
                </div>

                {/* Usage History */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                    <h2 className="text-xl font-bold mb-6">Recent Activity</h2>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-sm text-zinc-500 border-b border-zinc-800">
                                    <th className="pb-3">Date</th>
                                    <th className="pb-3">Time</th>
                                    <th className="pb-3">Agent</th>
                                    <th className="pb-3">Type</th>
                                    <th className="pb-3">Credits</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usageHistory.map((item, i) => (
                                    <tr key={i} className="border-b border-zinc-800/50">
                                        <td className="py-4 text-sm">{item.date}</td>
                                        <td className="py-4 text-sm text-zinc-400">{item.time}</td>
                                        <td className="py-4">
                                            <span className={`text-xs px-2 py-1 rounded ${item.agent === 'C-100' ? 'bg-blue-500/10 text-blue-400' :
                                                    item.agent === 'THC-1' ? 'bg-green-500/10 text-green-400' :
                                                        'bg-pink-500/10 text-pink-400'
                                                }`}>
                                                {item.agent}
                                            </span>
                                        </td>
                                        <td className="py-4 text-sm">{item.type}</td>
                                        <td className="py-4 text-sm">{item.credits} credits</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 pt-4 border-t border-zinc-800 flex justify-between items-center">
                        <button className="text-sm text-cyan-400 hover:underline">
                            Export Usage Data (CSV)
                        </button>
                        <button className="text-sm text-zinc-400 hover:text-white">
                            View Full History →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
