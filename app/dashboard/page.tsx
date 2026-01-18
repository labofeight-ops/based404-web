'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface UserData {
    id: number;
    username: string;
    name: string;
    photoUrl: string;
    tier: string;
    credits: number;
    dailyLimit: number;
    canBlend: boolean;
}

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('auth_token');

            if (!token) {
                router.push('/');
                return;
            }

            try {
                const res = await fetch('/api/user/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch');
                }

                const data = await res.json();
                setUser(data);
            } catch (error) {
                localStorage.removeItem('auth_token');
                router.push('/');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        router.push('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    const tierColors = {
        'FREE': 'from-gray-500 to-gray-700',
        'DOSED': 'from-purple-500 to-pink-500',
        'OVERDOSED': 'from-pink-500 to-red-500',
    };

    const tierColor = tierColors[user.tier as keyof typeof tierColors] || tierColors.FREE;

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="border-b border-white/10 bg-black/50 backdrop-blur-lg">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            BASED404
                        </h1>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm bg-red-500/20 hover:bg-red-500/30 rounded-lg transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* User Profile Section */}
                <div className="mb-12 text-center">
                    {user.photoUrl && (
                        <Image
                            src={user.photoUrl}
                            alt={user.name}
                            width={80}
                            height={80}
                            className="rounded-full mx-auto mb-4 border-2 border-purple-500"
                        />
                    )}
                    <h2 className="text-3xl font-bold mb-2">{user.name}</h2>
                    <p className="text-gray-400">@{user.username}</p>
                </div>

                {/* Telegram Bot Access - PROMINENT */}
                <div className="mb-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-2xl p-8">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold mb-4">Your Telegram Bot is Ready</h3>
                        <p className="text-gray-300 mb-6">
                            Start using BASED404 AI with all 3 agents, reminders, and blend mode
                        </p>
                        <a
                            href="https://t.me/based404official"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition"
                        >
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                            </svg>
                            Open Telegram Bot
                        </a>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
                        <div className="text-gray-400 text-sm mb-2">Current Plan</div>
                        <div className={`text-3xl font-bold bg-gradient-to-r ${tierColor} bg-clip-text text-transparent`}>
                            {user.tier}
                        </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
                        <div className="text-gray-400 text-sm mb-2">Doses Today</div>
                        <div className="text-3xl font-bold">
                            {user.credits}/{user.dailyLimit}
                        </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
                        <div className="text-gray-400 text-sm mb-2">Status</div>
                        <div className="text-3xl font-bold text-green-400">
                            {user.tier === 'FREE' ? '⚠️ Limited' : '✓ Active'}
                        </div>
                    </div>
                </div>

                {/* Upgrade Section - Only for FREE users */}
                {user.tier === 'FREE' && (
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-8">
                        <h3 className="text-2xl font-bold mb-4">Unlock Full Access</h3>
                        <p className="text-gray-300 mb-6">
                            Upgrade to access all agents, blend mode, and 250+ doses per day
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-black/50 rounded-lg p-6 border border-purple-500/30">
                                <h4 className="text-xl font-bold mb-2">DOSED</h4>
                                <div className="text-3xl font-bold mb-4">$29.99<span className="text-lg text-gray-400">/mo</span></div>
                                <ul className="space-y-2 mb-6 text-sm">
                                    <li>✓ 250 doses/day</li>
                                    <li>✓ All 3 agents</li>
                                    <li>✓ Blend mode</li>
                                    <li>✓ Priority support</li>
                                </ul>
                                <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-bold hover:shadow-lg hover:shadow-purple-500/50 transition">
                                    Upgrade to DOSED
                                </button>
                            </div>

                            <div className="bg-black/50 rounded-lg p-6 border border-pink-500/30">
                                <h4 className="text-xl font-bold mb-2">OVERDOSED</h4>
                                <div className="text-3xl font-bold mb-4">$79.99<span className="text-lg text-gray-400">/mo</span></div>
                                <ul className="space-y-2 mb-6 text-sm">
                                    <li>✓ 600 doses/day</li>
                                    <li>✓ All features</li>
                                    <li>✓ God mode</li>
                                    <li>✓ Early access</li>
                                </ul>
                                <button className="w-full py-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg font-bold hover:shadow-lg hover:shadow-pink-500/50 transition">
                                    Upgrade to OVERDOSED
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
