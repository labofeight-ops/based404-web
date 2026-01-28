'use client';

import { useState } from 'react';

interface PlanSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentPlan: string;
    onPlanSelected?: () => void;
}

export default function PlanSelectionModal({
    isOpen,
    onClose,
    currentPlan,
    onPlanSelected
}: PlanSelectionModalProps) {
    const [selectedPlan, setSelectedPlan] = useState(currentPlan);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const plans = [
        {
            name: 'FREE',
            price: '$0',
            period: '/forever',
            credits: '25',
            features: [
                'All 3 AI Agents',
                'Hybrid Blends',
                '25 Daily Credits',
                'Smart Reminders'
            ]
        },
        {
            name: 'DOSED',
            price: '$19',
            period: '/month',
            credits: '250',
            features: [
                'All 3 Agents',
                'Blend Mode',
                'Smart Reminders',
                '250 Daily Credits',
                'Priority Support'
            ],
            highlight: true,
            badge: 'MOST POPULAR'
        },
        {
            name: 'OVERDOSED',
            price: '$49',
            period: '/month',
            credits: '600',
            features: [
                'Everything in DOSED',
                'God Mode Access',
                'Advanced Analytics',
                '600 Daily Credits',
                'VIP Support',
                'Early Beta Features'
            ]
        }
    ];

    const handleSelectPlan = async () => {
        setLoading(true);

        const session = localStorage.getItem('session_token');

        try {
            const res = await fetch('/api/user/select-plan', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ plan: selectedPlan })
            });

            const data = await res.json();

            if (data.success) {
                if (onPlanSelected) onPlanSelected();
                window.location.reload(); // Refresh to update UI
            } else {
                alert('Failed to select plan: ' + data.error);
            }
        } catch (error) {
            console.error('Failed to select plan:', error);
            alert('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
            <div className="relative w-full max-w-6xl">
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 text-white hover:text-cyan-400 transition-colors text-base font-medium px-4 py-2 bg-white/10 rounded-full hover:bg-white/20"
                >
                    Close ✕
                </button>

                <h2 className="text-4xl font-bold text-white text-center mb-3">
                    Choose Your Dose
                </h2>
                <p className="text-zinc-400 text-center mb-8">
                    Select a plan to unlock your agents
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {plans.map(plan => (
                        <div
                            key={plan.name}
                            className={`
                                relative p-6 rounded-2xl border-2 cursor-pointer transition-all
                                ${selectedPlan === plan.name
                                    ? 'border-cyan-500 bg-cyan-500/10 scale-105'
                                    : plan.name === 'FREE' ? 'border-zinc-800 bg-zinc-900 hover:border-zinc-700' : 'border-zinc-800/30 bg-zinc-900/50 opacity-50 grayscale cursor-not-allowed'
                                }
                                ${plan.highlight ? 'ring-2 ring-cyan-500/30' : ''}
                            `}
                            onClick={() => plan.name === 'FREE' ? setSelectedPlan(plan.name) : null}
                        >
                            {plan.badge && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                    <div className="text-xs font-bold text-black bg-cyan-400 px-3 py-1 rounded-full">
                                        {plan.badge}
                                    </div>
                                </div>
                            )}

                            <div className="text-center mb-6">
                                <div className="text-2xl font-bold text-white mb-2">{plan.name}</div>
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                                    <span className="text-zinc-400 text-sm">{plan.period}</span>
                                </div>
                                <div className="text-cyan-400 text-sm font-semibold mt-2">
                                    {plan.credits} Daily Credits
                                </div>
                            </div>

                            <div className="space-y-3">
                                {plan.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-2 text-sm">
                                        <span className="text-cyan-400 mt-0.5">✓</span>
                                        <span className="text-zinc-300">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {selectedPlan === plan.name && (
                                <div className="absolute inset-0 rounded-2xl border-2 border-cyan-500 pointer-events-none">
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                                        <span className="text-black text-xs">✓</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={handleSelectPlan}
                        disabled={loading}
                        className="px-8 py-4 bg-cyan-600 hover:bg-cyan-700 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
                    >
                        {loading ? 'Selecting...' : `Confirm ${selectedPlan} Plan`}
                    </button>
                </div>
            </div>
        </div >
    );
}
