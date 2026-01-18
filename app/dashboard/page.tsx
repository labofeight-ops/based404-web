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
                <div className="text-zinc-400">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="border-b border-zinc-800 bg-black">
                <div className="max-w-5xl mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="bg-white text-black px-2 py-0.5 font-black text-lg">
                                404
                            </div>
                            <span className="text-lg font-bold">BASED404</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-sm text-zinc-400 hover:text-white transition-colors"
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-5xl mx-auto px-6 py-12">
                {/* Profile Section */}
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-8">
                        {user.photoUrl && (
                            <Image
                                src={user.photoUrl}
                                alt={user.name}
                                width={64}
                                height={64}
                                className="rounded-full"
                            />
                        )}
                        <div>
                            <h1 className="text-2xl font-semibold mb-1">{user.name}</h1>
                            <p className="text-zinc-400">@{user.username}</p>
                        </div>
                    </div>
                </div>

                {/* Main CTA */}
                <div className="mb-12 bg-zinc-800/30 border border-zinc-700 rounded-2xl p-8">
                    <h2 className="text-xl font-semibold mb-3">Access your AI agent</h2>
                    <p className="text-zinc-400 mb-6 text-sm">
                        Continue your conversation on Telegram with all agents and features
                    </p>
                    <a
                        href="https://t.me/based404official"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                        </svg>
                        Open Telegram Bot
                    </a>
                </div>

                {/* Stats Grid - WITH GRADIENTS */}
                <div className="grid grid-cols-3 gap-4 mb-12">
                    {/* Plan card - purple gradient */}
                    <div className="relative overflow-hidden bg-zinc-800/30 border border-zinc-700 rounded-xl p-4 hover:border-zinc-600 transition-all">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent pointer-events-none"></div>
                        <div className="relative z-10">
                            <div className="text-xs text-zinc-400 mb-1">Plan</div>
                            <div className="text-lg font-semibold">{user.tier}</div>
                        </div>
                    </div>

                    {/* Doses card - cyan gradient */}
                    <div className="relative overflow-hidden bg-zinc-800/30 border border-zinc-700 rounded-xl p-4 hover:border-zinc-600 transition-all">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent pointer-events-none"></div>
                        <div className="relative z-10">
                            <div className="text-xs text-zinc-400 mb-1">Doses today</div>
                            <div className="text-lg font-semibold">{user.credits}/{user.dailyLimit}</div>
                        </div>
                    </div>

                    {/* Status card - neutral */}
                    <div className="bg-zinc-800/30 border border-zinc-700 rounded-xl p-4 hover:border-zinc-600 transition-all">
                        <div className="text-xs text-zinc-400 mb-1">Status</div>
                        <div className="text-lg font-semibold">{user.tier === 'FREE' ? 'Limited' : 'Active'}</div>
                    </div>
                </div>

                {/* Upgrade Section */}
                {user.tier === 'FREE' && (
                    <div className="bg-zinc-800/30 border border-zinc-700 rounded-2xl p-8">
                        <h2 className="text-xl font-semibold mb-3">Upgrade your plan</h2>
                        <p className="text-zinc-400 mb-8 text-sm">
                            Get access to all agents, blend mode, and increased limits
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* DOSED card - cyan gradient */}
                            <div className="relative overflow-hidden bg-zinc-800/30 border border-zinc-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent pointer-events-none"></div>
                                <div className="relative z-10">
                                    <h3 className="text-lg font-semibold mb-2">DOSED</h3>
                                    <div className="text-3xl font-bold mb-4">
                                        $29.99<span className="text-base font-normal text-zinc-400">/month</span>
                                    </div>
                                    <ul className="space-y-2 mb-6 text-sm text-zinc-400">
                                        <li>• 250 doses/day</li>
                                        <li>• All 3 agents</li>
                                        <li>• Blend mode</li>
                                        <li>• Priority support</li>
                                    </ul>
                                    <button className="w-full py-2.5 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition-colors">
                                        Upgrade
                                    </button>
                                </div>
                            </div>

                            {/* OVERDOSED card - purple gradient */}
                            <div className="relative overflow-hidden bg-zinc-800/30 border border-zinc-700 rounded-xl p-6 hover:border-purple-500/50 transition-all">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent pointer-events-none"></div>
                                <div className="relative z-10">
                                    <h3 className="text-lg font-semibold mb-2">OVERDOSED</h3>
                                    <div className="text-3xl font-bold mb-4">
                                        $79.99<span className="text-base font-normal text-zinc-400">/month</span>
                                    </div>
                                    <ul className="space-y-2 mb-6 text-sm text-zinc-400">
                                        <li>• 600 doses/day</li>
                                        <li>• All features</li>
                                        <li>• God mode</li>
                                        <li>• Early access</li>
                                    </ul>
                                    <button className="w-full py-2.5 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition-colors">
                                        Upgrade
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
