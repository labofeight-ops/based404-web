'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

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
    const [isYearly, setIsYearly] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
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

    const selectPlan = async (plan: string) => {
        const sessionToken = localStorage.getItem('session_token');

        if (!sessionToken) return;

        setSelectedPlan(plan);

        try {
            const res = await fetch('/api/user/select-plan', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${sessionToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ plan })
            });

            const data = await res.json();

            if (data.success) {
                await fetchUserData();
                const updatedUser = { ...user, subscription: plan, credits: data.credits, planSelected: true };
                localStorage.setItem('user', JSON.stringify(updatedUser));
            }
        } catch (error) {
            console.error('Plan selection failed:', error);
        } finally {
            setSelectedPlan(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
            </div>
        );
    }

    if (!user) return null;

    const plans = [
        {
            id: 'FREE',
            name: 'FREE',
            price: { monthly: 0, yearly: 0 },
            credits: 5,
            description: '5 messages total. Single agent. Test the vibe.',
            features: [
                'Choose 1 agent only',
                '5 total messages',
                'Basic responses',
                'View profile'
            ],
            color: 'bg-zinc-800 border-zinc-700',
            textColor: 'text-zinc-400',
            buttonColor: 'bg-zinc-700 hover:bg-zinc-600 text-white'
        },
        {
            id: 'DOSED',
            name: 'DOSED',
            price: { monthly: 29.99, yearly: 224.99 },
            credits: 250,
            description: '250 messages/day. All agents. Blend mode unlocked.',
            features: [
                'All 3 agents full power',
                '250 daily credits',
                'Hybrid blend mode',
                'Advanced memory system',
                'Ritual scheduling',
                'Reminder system'
            ],
            color: 'bg-black border-cyan-400',
            textColor: 'text-cyan-400',
            buttonColor: 'bg-cyan-400 hover:bg-cyan-300 text-black'
        },
        {
            id: 'OVERDOSED',
            name: 'OVERDOSED',
            price: { monthly: 79.99, yearly: 599.99 },
            credits: 600,
            description: '600 messages/day. Elite tier. Early access to new agents.',
            features: [
                'Everything in DOSED',
                '600 daily credits',
                'Early agent releases',
                'Fastest response times',
                'VIP support channel',
                'Custom blend ratios'
            ],
            color: 'bg-black border-purple-400',
            textColor: 'text-purple-400',
            buttonColor: ' bg-purple-400 hover:bg-purple-300 text-black',
            popular: true
        }
    ];

    const creditsPercentage = user.credits / (user.subscription === 'FREE' ? 5 : user.subscription === 'DOSED' ? 250 : 600) * 100;

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />

            <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-24 pb-16">
                <div className="mb-12">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-2">
                        {user.name}
                    </h1>
                    <p className="text-zinc-400 text-lg">@{user.username || 'user'}</p>
                </div>

                {/* Stats Grid - More Engaging */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {/* Credits with Progress Bar */}
                    <div className="col-span-2 bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-3">
                            <div className="text-zinc-400 text-sm uppercase tracking-wide">Credits</div>
                            <div className="text-2xl font-black">{user.credits}</div>
                        </div>
                        <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-500"
                                style={{ width: `${Math.min(creditsPercentage, 100)}%` }}
                            />
                        </div>
                    </div>

                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                        <div className="text-5xl font-black mb-2">{user.messageCount}</div>
                        <div className="text-zinc-400 text-sm uppercase tracking-wide">Messages</div>
                    </div>

                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                        <div className="text-5xl font-black mb-2">{user.subscription}</div>
                        <div className="text-zinc-400 text-sm uppercase tracking-wide">Tier</div>
                    </div>

                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                        <div className="text-3xl font-black mb-2">{user.age || '--'}</div>
                        <div className="text-zinc-400 text-sm uppercase tracking-wide">Age</div>
                    </div>

                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                        <div className="text-3xl font-black mb-2">{user.gender || '--'}</div>
                        <div className="text-zinc-400 text-sm uppercase tracking-wide">Gender</div>
                    </div>

                    <div className="col-span-2 bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                        <div className="text-3xl font-black mb-2">{user.agent || 'None'}</div>
                        <div className="text-zinc-400 text-sm uppercase tracking-wide">Active Agent</div>
                    </div>
                </div>

                {/* Bot Access */}
                <div className="mb-16">
                    <a
                        href="https://t.me/BASED404BOT"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-4 bg-white text-black font-bold text-lg uppercase tracking-wide rounded-lg hover:bg-zinc-200 transition-colors"
                    >
                        Open Telegram Bot
                    </a>
                </div>

                {/* Plans Section */}
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-black mb-8">Choose Your Dose</h2>

                    {/* Monthly/Yearly Toggle */}
                    <div className="flex items-center justify-center gap-4 mb-12">
                        <span className={`text-sm font-bold uppercase tracking-wide transition-colors ${!isYearly ? 'text-white' : 'text-zinc-500'}`}>
                            Monthly
                        </span>
                        <button
                            onClick={() => setIsYearly(!isYearly)}
                            className="relative w-16 h-8 rounded-full bg-zinc-800 border-2 border-zinc-700 transition-all hover:border-zinc-600"
                        >
                            <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${isYearly ? 'left-[calc(100%-1.75rem)]' : 'left-1'}`} />
                        </button>
                        <span className={`text-sm font-bold uppercase tracking-wide transition-colors ${isYearly ? 'text-white' : 'text-zinc-500'}`}>
                            Yearly <span className="text-cyan-400 text-xs ml-1">(Save 25%)</span>
                        </span>
                    </div>

                    {/* Plan Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {plans.map((plan) => (
                            <div
                                key={plan.id}
                                className={`relative rounded-3xl border-2 ${plan.color} p-8 transition-all hover:scale-105`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-400 px-4 py-1 rounded-full">
                                        <span className="text-black text-xs font-bold uppercase tracking-wider">Popular</span>
                                    </div>
                                )}

                                <h3 className="text-3xl font-black mb-2">{plan.name}</h3>

                                {plan.price.monthly > 0 && (
                                    <div className="mb-4">
                                        <span className={`text-4xl font-black ${plan.textColor}`}>
                                            ${isYearly ? plan.price.yearly : plan.price.monthly}
                                        </span>
                                        <span className="text-zinc-400 text-sm">/{isYearly ? 'year' : 'month'}</span>
                                    </div>
                                )}

                                <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                                    {plan.description}
                                </p>

                                <div className="space-y-3 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <div className={`w-1.5 h-1.5 rounded-full ${plan.textColor} mt-2 flex-shrink-0`} />
                                            <span className="text-sm text-zinc-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => selectPlan(plan.id)}
                                    disabled={selectedPlan === plan.id || user.subscription === plan.id}
                                    className={`w-full py-4 px-6 ${plan.buttonColor} font-bold text-sm uppercase tracking-wide rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    {selectedPlan === plan.id ? 'Activating...' : user.subscription === plan.id ? 'Current Plan' : `Activate ${plan.name}`}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
