'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Link from 'next/link';

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserData();
        const interval = setInterval(() => fetchUserData(true), 10000);
        return () => clearInterval(interval);
    }, []);

    const fetchUserData = async (silent = false) => {
        const sessionToken = localStorage.getItem('session_token');
        if (!sessionToken) {
            router.push('/');
            return;
        }

        try {
            const res = await fetch('/api/user/me', {
                headers: { 'Authorization': `Bearer ${sessionToken}` }
            });

            if (!res.ok) {
                localStorage.removeItem('session_token');
                localStorage.removeItem('user');
                router.push('/');
                return;
            }

            const data = await res.json();
            setUser(data);
            setLoading(false);
        } catch (error) {
            router.push('/');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-cyan-400 animate-pulse">Loading...</div>
            </div>
        );
    }

    if (!user) return null;

    const getLimit = (plan: string) => {
        switch (plan?.toUpperCase()) {
            case 'DOSED': return 250;
            case 'OVERDOSED': return 600;
            default: return 10;
        }
    };

    const limit = getLimit(user.subscription);
    const creditsRemaining = user.credits;
    const usagePercent = ((limit - creditsRemaining) / limit) * 100;
    const planRank = { 'FREE': 0, 'DOSED': 1, 'OVERDOSED': 2 };
    const currentRank = planRank[user.subscription?.toUpperCase() as keyof typeof planRank] || 0;

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />

            <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-24 pb-16">
                {/* Hero */}
                <div className="mb-8">
                    <p className="text-zinc-500 text-sm mb-1">Welcome back</p>
                    <h1 className="text-5xl font-black tracking-tight">{user.name}</h1>
                    <p className="text-zinc-400">@{user.username || 'user'}</p>
                </div>

                {/* CTA Button */}
                <div className="mb-10">
                    <a
                        href="https://t.me/BASED404BOT"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-black text-lg rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20"
                    >
                        Enter the Simulation →
                    </a>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-10">
                    {/* Doses */}
                    <div className="col-span-2 bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-3">
                            <div>
                                <p className="text-zinc-500 text-sm">Doses remaining</p>
                                <p className="text-4xl font-black text-cyan-400">{creditsRemaining}<span className="text-zinc-500 text-lg">/{limit}</span></p>
                            </div>
                            <div className={`px-4 py-2 rounded-xl font-bold ${user.subscription?.toUpperCase() === 'OVERDOSED' ? 'bg-purple-500/20 text-purple-400' :
                                    user.subscription?.toUpperCase() === 'DOSED' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-zinc-800 text-zinc-400'
                                }`}>
                                {user.subscription || 'FREE'}
                            </div>
                        </div>
                        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all"
                                style={{ width: `${100 - usagePercent}%` }}
                            />
                        </div>
                    </div>

                    {/* Other Stats */}
                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                        <p className="text-zinc-500 text-sm">Total messages</p>
                        <p className="text-3xl font-black">{user.messageCount || 0}</p>
                    </div>

                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                        <p className="text-zinc-500 text-sm">Active agent</p>
                        <p className={`text-2xl font-black ${user.agent === 'C-100' ? 'text-blue-400' :
                                user.agent === 'THC-1' ? 'text-green-400' :
                                    user.agent === 'MOLLY-X' ? 'text-pink-400' : 'text-zinc-400'
                            }`}>
                            {user.agent || 'None'}
                        </p>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="grid grid-cols-3 gap-4 mb-10">
                    <Link href="/dashboard/usage" className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-5 transition-all text-center">
                        <p className="font-bold">Usage</p>
                    </Link>
                    <Link href="/dashboard/subscription" className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-5 transition-all text-center">
                        <p className="font-bold">Plans</p>
                    </Link>
                    <Link href="/dashboard/settings" className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-5 transition-all text-center">
                        <p className="font-bold">Settings</p>
                    </Link>
                </div>

                {/* Upgrade CTA for FREE users */}
                {currentRank === 0 && (
                    <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl p-8 text-center">
                        <h2 className="text-2xl font-bold mb-2">You're on FREE</h2>
                        <p className="text-zinc-400 mb-6">Unlock all agents, web search, memory, and reminders.</p>
                        <Link href="/dashboard/subscription" className="inline-block px-8 py-3 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-600 transition-colors">
                            Upgrade to DOSED — $19/mo
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
