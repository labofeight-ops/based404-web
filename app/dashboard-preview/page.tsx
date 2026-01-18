'use client';

import { useEffect } from 'react';
import Image from 'next/image';

// Mock data for preview
const mockUser = {
    id: 123456789,
    username: 'preview_user',
    name: 'Preview User',
    photoUrl: 'https://ui-avatars.com/api/?name=Preview+User&background=6366f1&color=fff&size=128',
    tier: 'FREE',
    credits: 7,
    dailyLimit: 10,
    canBlend: false,
};

export default function DashboardPreviewPage() {
    const user = mockUser;

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Preview Banner */}
            <div className="bg-yellow-500/10 border-b border-yellow-500/30 py-2">
                <p className="text-center text-sm text-yellow-500">
                    📋 PREVIEW MODE - This is how your dashboard will look after login
                </p>
            </div>

            {/* Header - x.ai style */}
            <header className="border-b border-zinc-800 bg-black">
                <div className="max-w-5xl mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="bg-white text-black px-2 py-0.5 font-black text-lg">
                                404
                            </div>
                            <span className="text-lg font-bold">BASED404</span>
                        </div>
                        <a
                            href="/"
                            className="text-sm text-zinc-400 hover:text-white transition-colors"
                        >
                            Back to Home
                        </a>
                    </div>
                </div>
            </header>

            <div className="max-w-5xl mx-auto px-6 py-12">
                {/* Profile Section */}
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-8">
                        <Image
                            src={user.photoUrl}
                            alt={user.name}
                            width={64}
                            height={64}
                            className="rounded-full"
                        />
                        <div>
                            <h1 className="text-2xl font-semibold mb-1">{user.name}</h1>
                            <p className="text-zinc-400">@{user.username}</p>
                        </div>
                    </div>
                </div>

                {/* Main CTA - Telegram Bot Access */}
                <div className="mb-12 bg-zinc-950 border border-zinc-800 rounded-2xl p-8">
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

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-12">
                    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
                        <div className="text-xs text-zinc-500 mb-1">Plan</div>
                        <div className="text-lg font-semibold">{user.tier}</div>
                    </div>

                    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
                        <div className="text-xs text-zinc-500 mb-1">Doses today</div>
                        <div className="text-lg font-semibold">{user.credits}/{user.dailyLimit}</div>
                    </div>

                    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
                        <div className="text-xs text-zinc-500 mb-1">Status</div>
                        <div className="text-lg font-semibold">Limited</div>
                    </div>
                </div>

                {/* Upgrade Section */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8">
                    <h2 className="text-xl font-semibold mb-3">Upgrade your plan</h2>
                    <p className="text-zinc-400 mb-8 text-sm">
                        Get access to all agents, blend mode, and increased limits
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="border border-zinc-800 rounded-xl p-6">
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

                        <div className="border border-zinc-800 rounded-xl p-6">
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
        </div>
    );
}
