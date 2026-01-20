'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Link from 'next/link';

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [nickname, setNickname] = useState('');
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

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
            setNickname(data.name || '');
            setLoading(false);
        } catch (error) {
            router.push('/');
        }
    };

    const handleSaveNickname = async () => {
        if (!nickname.trim()) return;
        setSaving(true);
        setMessage('');

        try {
            const sessionToken = localStorage.getItem('session_token');
            const response = await fetch('/api/user/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ session_token: sessionToken, name: nickname.trim() }),
            });

            const data = await response.json();
            if (data.success) {
                setUser({ ...user, name: nickname.trim() });
                setMessage('Saved');
                setTimeout(() => setMessage(''), 2000);
            }
        } catch (error) {
            setMessage('Error');
        }
        setSaving(false);
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
                        className="inline-block px-8 py-4 bg-white text-black font-bold text-lg rounded-xl hover:bg-zinc-200 transition-colors"
                    >
                        Enter the Simulation →
                    </a>
                </div>

                {/* Usage Section */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 mb-6">
                    <h2 className="text-lg font-bold mb-4">Usage</h2>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                            <p className="text-zinc-500 text-sm">Used today</p>
                            <p className="text-2xl font-black">{limit - creditsRemaining}</p>
                        </div>
                        <div>
                            <p className="text-zinc-500 text-sm">Remaining</p>
                            <p className="text-2xl font-black text-cyan-400">{creditsRemaining}</p>
                        </div>
                        <div>
                            <p className="text-zinc-500 text-sm">Plan</p>
                            <p className={`text-2xl font-black ${user.subscription?.toUpperCase() === 'OVERDOSED' ? 'text-purple-400' :
                                    user.subscription?.toUpperCase() === 'DOSED' ? 'text-cyan-400' : ''
                                }`}>
                                {user.subscription || 'FREE'}
                            </p>
                        </div>
                    </div>
                    <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden mb-2">
                        <div
                            className="h-full bg-cyan-500 transition-all"
                            style={{ width: `${100 - usagePercent}%` }}
                        />
                    </div>
                    <p className="text-xs text-zinc-600">{limit} doses/day • Resets at midnight UTC</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
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

                {/* Settings Section */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 mb-6">
                    <h2 className="text-lg font-bold mb-4">Settings</h2>

                    {/* Nickname */}
                    <div className="mb-4">
                        <label className="block text-sm text-zinc-400 mb-2">Nickname</label>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                                maxLength={50}
                            />
                            <button
                                onClick={handleSaveNickname}
                                disabled={saving}
                                className="px-5 py-2.5 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 disabled:opacity-50 transition-colors"
                            >
                                {saving ? '...' : message || 'Save'}
                            </button>
                        </div>
                    </div>

                    {/* Other info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Telegram</label>
                            <p className="text-zinc-300">@{user.username || 'N/A'}</p>
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Gender</label>
                            <p className="text-zinc-300 capitalize">{user.gender || 'N/A'}</p>
                        </div>
                    </div>
                </div>

                {/* Upgrade CTA for FREE users */}
                {currentRank === 0 && (
                    <div className="bg-zinc-950 border border-cyan-500/30 rounded-2xl p-6 text-center">
                        <p className="text-lg font-bold mb-2">You're on FREE</p>
                        <p className="text-zinc-400 text-sm mb-4">Unlock all agents, web search, memory, and reminders.</p>
                        <Link href="/dashboard/subscription" className="inline-block px-6 py-2.5 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-colors">
                            Upgrade — $19/mo
                        </Link>
                    </div>
                )}

                {/* Danger Zone */}
                <div className="mt-6 pt-6 border-t border-zinc-800">
                    <button className="text-sm text-red-400 hover:underline">Delete account</button>
                </div>
            </div>
        </div>
    );
}
