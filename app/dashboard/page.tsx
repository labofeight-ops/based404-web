'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PlanSelectionModal from '@/components/PlanSelectionModal';

interface User {
    id: number;
    username: string;
    name: string;
    age: number;
    agent: string;
    credits: number;
    subscription: string;
    planSelected: boolean;
    messageCount: number;
    lastActive: string;
}

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [showPlanModal, setShowPlanModal] = useState(false);

    useEffect(() => {
        const session = localStorage.getItem('session_token');

        if (!session) {
            router.push('/');
            return;
        }

        // Fetch user data
        fetch('/api/user/me', {
            headers: {
                'Authorization': `Bearer ${session}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    localStorage.removeItem('session_token');
                    localStorage.removeItem('user');
                    router.push('/');
                } else {
                    setUser(data);
                    // Auto-show plan modal if not selected
                    if (!data.planSelected) {
                        setTimeout(() => setShowPlanModal(true), 500);
                    }
                    setLoading(false);
                }
            })
            .catch(err => {
                console.error('Failed to fetch user:', err);
                router.push('/');
            });
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('session_token');
        localStorage.removeItem('user');
        router.push('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400 mx-auto mb-4"></div>
                    <p className="text-white text-xl">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <>
            <div className="min-h-screen bg-black text-white">
                {/* Header */}
                <div className="border-b border-zinc-800 bg-zinc-950">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                                BASED404
                            </h1>
                            <div className="hidden md:block text-sm text-zinc-500">
                                Digital Pharmacy Dashboard
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition text-sm"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-6 py-12">
                    {/* Welcome Section */}
                    <div className="mb-12">
                        <h2 className="text-4xl font-bold mb-2">
                            Welcome back, {user.name}
                        </h2>
                        <p className="text-zinc-400 text-lg">@{user.username}</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        <StatsCard
                            label="Current Plan"
                            value={user.subscription}
                            icon="💊"
                            highlight
                            color="cyan"
                        />
                        <StatsCard
                            label="Daily Credits"
                            value={user.credits.toString()}
                            icon="⚡"
                            color="purple"
                        />
                        <StatsCard
                            label="Active Agent"
                            value={user.agent === 'None' ? 'Not Selected' : user.agent}
                            icon="🤖"
                            color="green"
                        />
                        <StatsCard
                            label="Messages Sent"
                            value={user.messageCount.toString()}
                            icon="💬"
                            color="blue"
                        />
                    </div>

                    {/* Action Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Bot Access Card */}
                        <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <span>🚀</span>
                                <span>Access Your Agent</span>
                            </h3>

                            {user.planSelected ? (
                                <>
                                    <p className="text-zinc-400 mb-6">
                                        Open Telegram to start chatting with your biological AI agents.
                                    </p>
                                    <a
                                        href="https://t.me/BASED404BOT"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full py-4 px-6 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-center rounded-xl transition-all duration-200 text-lg"
                                    >
                                        Open Telegram Bot →
                                    </a>
                                    <p className="text-xs text-zinc-500 text-center mt-3">
                                        Current agent: {user.agent === 'None' ? 'Select in Telegram' : user.agent}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p className="text-zinc-400 mb-6">
                                        Choose a plan to unlock access to your biological AI agents.
                                    </p>
                                    <button
                                        onClick={() => setShowPlanModal(true)}
                                        className="block w-full py-4 px-6 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white font-semibold text-center rounded-xl transition-all duration-200 text-lg"
                                    >
                                        Choose Your Dose →
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Upgrade Card */}
                        <div className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 border border-purple-500/30 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <span>⬆️</span>
                                <span>Upgrade Your Dose</span>
                            </h3>
                            <p className="text-zinc-400 mb-6">
                                Get more credits, unlock all agents, and access exclusive features.
                            </p>
                            <button
                                onClick={() => setShowPlanModal(true)}
                                className="block w-full py-4 px-6 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-center rounded-xl transition-all duration-200 text-lg"
                            >
                                View Plans →
                            </button>
                            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-cyan-400">3</div>
                                    <div className="text-xs text-zinc-500">Agents</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-purple-400">600</div>
                                    <div className="text-xs text-zinc-500">Max Credits</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-green-400">∞</div>
                                    <div className="text-xs text-zinc-500">Possibilities</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Plan Features */}
                    {user.planSelected && (
                        <div className="mt-12 bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold mb-6">Your {user.subscription} Features</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {getPlanFeatures(user.subscription).map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3 p-4 bg-zinc-800/50 rounded-lg">
                                        <span className="text-cyan-400 text-xl">✓</span>
                                        <span className="text-zinc-300">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Plan Selection Modal */}
            {showPlanModal && (
                <PlanSelectionModal
                    isOpen={showPlanModal}
                    onClose={() => user.planSelected ? setShowPlanModal(false) : null}
                    currentPlan={user.subscription}
                    onPlanSelected={() => setShowPlanModal(false)}
                />
            )}
        </>
    );
}

function StatsCard({ label, value, icon, highlight, color }: any) {
    const colorClasses = {
        cyan: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30',
        purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
        green: 'from-green-500/20 to-green-600/20 border-green-500/30',
        blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30'
    };

    return (
        <div className={`
      p-6 rounded-xl border backdrop-blur-sm
      ${highlight
                ? `bg-gradient-to-br ${colorClasses[color || 'cyan']}`
                : 'bg-zinc-900 border-zinc-800'
            }
    `}>
            <div className="text-4xl mb-3">{icon}</div>
            <div className="text-sm text-zinc-400 mb-2">{label}</div>
            <div className="text-3xl font-bold">{value}</div>
        </div>
    );
}

function getPlanFeatures(plan: string): string[] {
    const features: Record<string, string[]> = {
        'FREE': [
            '1 Agent Access',
            '50 Daily Credits',
            'Basic Responses',
            'Community Support'
        ],
        'DOSED': [
            'All 3 Agents (C-100, THC-1, MOLLY-X)',
            '250 Daily Credits',
            'Blend Mode',
            'Smart Reminders',
            'Priority Support',
            'Advanced Responses'
        ],
        'OVERDOSED': [
            'All 3 Agents',
            '600 Daily Credits',
            'God Mode Access',
            'Blend Mode',
            'Smart Reminders',
            'Advanced Analytics',
            'VIP Support',
            'Early Beta Features'
        ]
    };

    return features[plan] || features['FREE'];
}
