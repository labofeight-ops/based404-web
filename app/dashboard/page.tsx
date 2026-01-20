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

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />

            <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-24 pb-16">
                {/* Hero */}
                <div className="mb-10">
                    <p className="text-zinc-500 text-sm mb-1">Welcome back</p>
                    <h1 className="text-5xl font-black tracking-tight">{user.name}</h1>
                    <p className="text-zinc-400">@{user.username || 'user'}</p>
                </div>

                {/* Open Bot */}
                <div className="mb-10">
                    <a
                        href="https://t.me/BASED404BOT"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors"
                    >
                        Open Bot →
                    </a>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-10">
                    <div className="col-span-2 bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-3">
                            <div>
                                <p className="text-zinc-500 text-sm">Doses left</p>
                                <p className="text-3xl font-black text-cyan-400">{creditsRemaining}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-zinc-500 text-sm">Plan</p>
                                <p className={`text-2xl font-black ${user.subscription?.toUpperCase() === 'OVERDOSED' ? 'text-purple-400' :
                                        user.subscription?.toUpperCase() === 'DOSED' ? 'text-cyan-400' : ''
                                    }`}>
                                    {user.subscription || 'FREE'}
                                </p>
                            </div>
                        </div>
                        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-cyan-500 transition-all"
                                style={{ width: `${100 - usagePercent}%` }}
                            />
                        </div>
                        <p className="text-xs text-zinc-600 mt-2">{limit} doses/day</p>
                    </div>

                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                        <p className="text-zinc-500 text-sm">Messages</p>
                        <p className="text-3xl font-black">{user.messageCount || 0}</p>
                    </div>

                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                        <p className="text-zinc-500 text-sm">Agent</p>
                        <p className={`text-2xl font-black ${user.agent === 'C-100' ? 'text-blue-400' :
                                user.agent === 'THC-1' ? 'text-green-400' :
                                    user.agent === 'MOLLY-X' ? 'text-pink-400' : ''
                            }`}>
                            {user.agent || 'None'}
                        </p>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link href="/dashboard/usage" className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-5 transition-all">
                        <p className="font-bold">Usage</p>
                        <p className="text-sm text-zinc-500">Track your doses</p>
                    </Link>
                    <Link href="/dashboard/subscription" className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-5 transition-all">
                        <p className="font-bold">Subscription</p>
                        <p className="text-sm text-zinc-500">Manage your plan</p>
                    </Link>
                    <Link href="/dashboard/settings" className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-5 transition-all">
                        <p className="font-bold">Settings</p>
                        <p className="text-sm text-zinc-500">Edit profile</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
