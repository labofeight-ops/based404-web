'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Link from 'next/link';

interface UserData {
    id: number;
    username: string;
    name: string;
    age: number;
    gender: string;
    agent: string;
    credits: number;
    subscription: string;
    planSelected: boolean;
    messageCount: number;
}

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserData();

        // Poll for updates every 10 seconds
        const interval = setInterval(() => {
            fetchUserData(true);
        }, 10000);

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
            console.error('Failed to fetch user data:', error);
            router.push('/');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-cyan-400 animate-pulse">Loading your profile...</div>
            </div>
        );
    }

    if (!user) return null;

    const getLimit = (plan: string) => {
        switch (plan?.toUpperCase()) {
            case 'DOSED': return 250;
            case 'OVERDOSED': return 999;
            default: return 10;
        }
    };

    const limit = getLimit(user.subscription);
    const isUnlimited = user.subscription?.toUpperCase() === 'OVERDOSED';
    const creditsRemaining = user.credits;
    const creditsUsed = limit - creditsRemaining;
    const creditsPercentage = isUnlimited ? 0 : (creditsUsed / limit) * 100;

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />

            <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-24 pb-16">
                {/* Hero Section */}
                <div className="mb-12">
                    <p className="text-zinc-500 text-sm uppercase tracking-wider mb-2">Welcome back</p>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-3">
                        {user.name}
                    </h1>
                    <p className="text-zinc-400">@{user.username || 'user'}</p>
                </div>

                {/* Quick Action */}
                <div className="mb-12">
                    <a
                        href="https://t.me/BASED404BOT"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-lg rounded-xl hover:bg-zinc-200 transition-colors"
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                        </svg>
                        Open Bot
                    </a>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-12">
                    {/* Doses Left */}
                    <div className="col-span-2 bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-zinc-500 text-sm mb-1">Doses left today</p>
                                <p className={`text-4xl font-black ${isUnlimited ? 'text-purple-400' : 'text-cyan-400'}`}>
                                    {isUnlimited ? '∞' : creditsRemaining}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-zinc-500 text-sm mb-1">Plan</p>
                                <p className={`text-2xl font-black ${user.subscription?.toUpperCase() === 'OVERDOSED' ? 'text-purple-400' :
                                        user.subscription?.toUpperCase() === 'DOSED' ? 'text-cyan-400' : ''
                                    }`}>
                                    {user.subscription || 'FREE'}
                                </p>
                            </div>
                        </div>
                        {!isUnlimited && (
                            <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-700 ${creditsPercentage > 90 ? 'bg-red-500' :
                                            creditsPercentage > 70 ? 'bg-yellow-500' :
                                                'bg-gradient-to-r from-cyan-500 to-purple-500'
                                        }`}
                                    style={{ width: `${100 - creditsPercentage}%` }}
                                />
                            </div>
                        )}
                        {isUnlimited && (
                            <p className="text-sm text-zinc-500">No limits. Go wild.</p>
                        )}
                    </div>

                    {/* Messages Sent */}
                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                        <p className="text-zinc-500 text-sm mb-1">Messages sent</p>
                        <p className="text-4xl font-black">{user.messageCount || 0}</p>
                    </div>

                    {/* Active Agent */}
                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                        <p className="text-zinc-500 text-sm mb-1">Current agent</p>
                        <p className={`text-3xl font-black truncate ${user.agent === 'C-100' ? 'text-blue-400' :
                                user.agent === 'THC-1' ? 'text-green-400' :
                                    user.agent === 'MOLLY-X' ? 'text-pink-400' :
                                        user.agent === 'BLEND' ? 'text-gradient bg-gradient-to-r from-blue-400 via-green-400 to-pink-400 bg-clip-text text-transparent' : ''
                            }`}>
                            {user.agent || 'None'}
                        </p>
                    </div>

                    {/* Personal Info */}
                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                        <p className="text-zinc-500 text-sm mb-1">Age</p>
                        <p className="text-3xl font-black">{user.age || '--'}</p>
                    </div>

                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                        <p className="text-zinc-500 text-sm mb-1">Gender</p>
                        <p className="text-3xl font-black capitalize">{user.gender || '--'}</p>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                        href="/dashboard/usage"
                        className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-bold group-hover:text-cyan-400 transition-colors">Usage</p>
                                <p className="text-sm text-zinc-500">See where your doses went</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/dashboard/subscription"
                        className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-bold group-hover:text-purple-400 transition-colors">Subscription</p>
                                <p className="text-sm text-zinc-500">Manage plan & billing</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/dashboard/settings"
                        className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-zinc-700/50 flex items-center justify-center">
                                <svg className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-bold group-hover:text-white transition-colors">Settings</p>
                                <p className="text-sm text-zinc-500">Edit profile & preferences</p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Need More Section */}
                {user.subscription?.toUpperCase() !== 'OVERDOSED' && (
                    <div className="mt-12 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-8 text-center">
                        <h2 className="text-2xl font-bold mb-2">Want more doses?</h2>
                        <p className="text-zinc-400 mb-6">
                            {user.subscription?.toUpperCase() === 'DOSED'
                                ? 'Go OVERDOSED for unlimited access.'
                                : 'Upgrade to unlock all agents and more doses.'}
                        </p>
                        <Link
                            href="/dashboard/subscription"
                            className="inline-block px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors"
                        >
                            View Plans
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
