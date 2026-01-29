'use client';

import React, { useState, useEffect } from 'react';
import {
    Users,
    Zap,
    DollarSign,
    Activity,
    Lock,
    ArrowRight,
    BarChart3,
    User,
    Clock,
    Shield,
    TrendingUp
} from 'lucide-react';

interface AnalyticsData {
    stats: {
        totalUsers: number;
        active24h: number;
        liveVisitors: number;
        mrr: number;
    };
    subscriptions: Array<{ subscription: string; count: string }>;
    agents: Array<{ chosen_agent: string; count: string }>;
    recentUsers: Array<{
        user_id: string;
        username: string;
        name: string;
        subscription: string;
        last_active: string;
    }>;
}

export default function AdminPage() {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'Pedro123') {
            setIsAuthenticated(true);
            fetchData();
        } else {
            setError('Invalid credentials');
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/admin/analytics', {
                headers: {
                    'Authorization': 'Pedro123'
                }
            });
            if (response.ok) {
                const json = await response.json();
                setData(json);
            } else {
                setError('Failed to fetch data');
            }
        } catch (err) {
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            const interval = setInterval(fetchData, 30000); // refresh every 30s
            return () => clearInterval(interval);
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <div className="max-w-md w-full glass p-8 rounded-[40px] border border-neutral-800 shadow-2xl">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-4">
                            <Lock className="text-cyan-400 w-8 h-8" />
                        </div>
                        <h1 className="text-3xl font-black text-white uppercase italic">Access Restricted</h1>
                        <p className="text-neutral-500 mt-2 text-center text-sm">Enter administrator password to continue</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Admin Password"
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500 transition-all"
                                autoFocus
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
                        <button
                            type="submit"
                            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black py-4 rounded-2xl transition-all uppercase tracking-wider flex items-center justify-center gap-2"
                        >
                            DECRYPT ACCESS <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    if (loading && !data) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-4 sm:p-8 font-sans selection:bg-cyan-500/30">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-black italic uppercase tracking-tighter flex items-center gap-3">
                            <Shield className="text-cyan-400 w-10 h-10" />
                            NEURAL ASSETS <span className="text-cyan-400">ADMIN</span>
                        </h1>
                        <p className="text-neutral-500 font-medium">REAL-TIME PERFORMANCE MONITORING</p>
                    </div>
                    <div className="flex items-center gap-3 bg-neutral-900/50 p-2 rounded-2xl border border-neutral-800">
                        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-xl border border-green-500/20">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-green-500 text-xs font-bold uppercase tracking-widest">
                                {data?.stats.liveVisitors || 0} LIVE NOW
                            </span>
                        </div>
                        <button
                            onClick={fetchData}
                            className="p-2 hover:bg-white/5 rounded-xl transition-all"
                        >
                            <Activity className="w-5 h-5 text-neutral-400" />
                        </button>
                    </div>
                </div>

                {/* STATS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatsCard
                        title="TOTAL ASSETS"
                        value={data?.stats.totalUsers || 0}
                        icon={<Users className="w-5 h-5" />}
                        color="cyan"
                    />
                    <StatsCard
                        title="ACTIVE (24H)"
                        value={data?.stats.active24h || 0}
                        icon={<Activity className="w-5 h-5" />}
                        color="green"
                    />
                    <StatsCard
                        title="PROJECTED MRR"
                        value={`$${data?.stats.mrr || 0}`}
                        icon={<DollarSign className="w-5 h-5" />}
                        color="amber"
                    />
                    <StatsCard
                        title="GROWTH RATE"
                        value="+12.5%"
                        icon={<TrendingUp className="w-5 h-5" />}
                        color="purple"
                    />
                </div>

                {/* VISUALS SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* SUBSCRIPTION MIX */}
                    <div className="glass p-6 rounded-[30px] border border-neutral-800/50 lg:col-span-1">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-black uppercase text-neutral-400 tracking-wider flex items-center gap-2">
                                <BarChart3 className="w-4 h-4" /> SUBSCRIPTION MIX
                            </h3>
                        </div>
                        <div className="space-y-4">
                            {data?.subscriptions.map(sub => (
                                <div key={sub.subscription} className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold">
                                        <span className="text-neutral-300">{sub.subscription}</span>
                                        <span className="text-white">{sub.count}</span>
                                    </div>
                                    <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden border border-neutral-800">
                                        <div
                                            className={`h-full rounded-full ${sub.subscription === 'ELITE' || sub.subscription === 'OVERDOSED' ? 'bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]' :
                                                    sub.subscription === 'PRO' || sub.subscription === 'DOSED' ? 'bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]' :
                                                        'bg-neutral-600'
                                                }`}
                                            style={{ width: `${(parseInt(sub.count) / (data?.stats.totalUsers || 1)) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AGENT DOMINANCE */}
                    <div className="glass p-6 rounded-[30px] border border-neutral-800/50 lg:col-span-1">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-black uppercase text-neutral-400 tracking-wider flex items-center gap-2">
                                <Zap className="w-4 h-4" /> AGENT DOMINANCE
                            </h3>
                        </div>
                        <div className="space-y-4">
                            {data?.agents.map(agent => (
                                <div key={agent.chosen_agent} className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black border ${agent.chosen_agent === 'GHOST-7' ? 'bg-white/5 border-white/10 text-white' :
                                            agent.chosen_agent === 'VOID-9' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' :
                                                'bg-purple-500/10 border-purple-500/20 text-purple-400'
                                        }`}>
                                        {agent.chosen_agent.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-black">{agent.chosen_agent}</p>
                                        <div className="w-full bg-neutral-900 h-1.5 rounded-full mt-1">
                                            <div
                                                className={`h-full rounded-full ${agent.chosen_agent === 'GHOST-7' ? 'bg-white' :
                                                        agent.chosen_agent === 'VOID-9' ? 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]' :
                                                            'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]'
                                                    }`}
                                                style={{ width: `${(parseInt(agent.count) / (data?.stats.totalUsers || 1)) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-neutral-400">{agent.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* REAL-TIME FEED */}
                    <div className="glass p-6 rounded-[30px] border border-neutral-800/50 lg:col-span-1">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-black uppercase text-neutral-400 tracking-wider flex items-center gap-2">
                                <Activity className="w-4 h-4" /> RECENT ACTIVITY
                            </h3>
                        </div>
                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {data?.recentUsers.map(user => (
                                <div key={user.user_id} className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-neutral-800 rounded-lg flex items-center justify-center">
                                            <User className="w-4 h-4 text-neutral-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold">@{user.username || 'anon'}</p>
                                            <p className="text-[10px] text-neutral-500">{new Date(user.last_active).toLocaleTimeString()}</p>
                                        </div>
                                    </div>
                                    <span className={`text-[10px] font-black px-2 py-1 rounded-md ${user.subscription === 'ELITE' || user.subscription === 'OVERDOSED' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                                            user.subscription === 'PRO' || user.subscription === 'DOSED' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' :
                                                'bg-neutral-800 text-neutral-400 border border-neutral-700'
                                        }`}>
                                        {user.subscription}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* USER MANAGEMENT (BASIC) */}
                <div className="glass p-8 rounded-[40px] border border-neutral-800/50">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-black uppercase italic tracking-tighter">Database Monitor</h3>
                            <p className="text-neutral-500 text-xs mt-1">LATEST USER REGISTRATIONS AND ACTIVITY</p>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Clock className="h-4 w-4 text-neutral-500" />
                            </div>
                            <div className="pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-neutral-400 font-bold uppercase">
                                System Status: Operational
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-neutral-800 text-neutral-500 text-[10px] font-black uppercase tracking-widest">
                                    <th className="px-4 py-4">Subject ID</th>
                                    <th className="px-4 py-4">Identity</th>
                                    <th className="px-4 py-4">Tier Status</th>
                                    <th className="px-4 py-4">Last Sync</th>
                                    <th className="px-4 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-800/50">
                                {data?.recentUsers.map(user => (
                                    <tr key={user.user_id} className="hover:bg-white/5 transition-all group">
                                        <td className="px-4 py-4 font-mono text-xs text-neutral-500">{user.user_id}</td>
                                        <td className="px-4 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-black">{user.name || 'Anonymous Object'}</span>
                                                <span className="text-[10px] text-cyan-500/70">@{user.username || 'no_alias'}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={`text-[10px] font-black px-2 py-0.5 rounded ${user.subscription === 'ELITE' || user.subscription === 'OVERDOSED' ? 'text-purple-400' :
                                                    user.subscription === 'PRO' || user.subscription === 'DOSED' ? 'text-cyan-400' :
                                                        'text-neutral-500'
                                                }`}>
                                                {user.subscription}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-[10px] text-neutral-400">
                                            {formatSyncTime(user.last_active)}
                                        </td>
                                        <td className="px-4 py-4">
                                            <button className="text-[10px] font-black text-white hover:text-cyan-400 transition-colors uppercase tracking-widest">
                                                INSPECT
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .glass {
                    background: rgba(10, 10, 10, 0.7);
                    backdrop-filter: blur(20px);
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #262626;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #404040;
                }
            `}</style>
        </div>
    );
}

function StatsCard({ title, value, icon, color }: { title: string; value: string | number; icon: React.ReactNode; color: string }) {
    const colorClasses = {
        cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)]',
        green: 'text-green-400 bg-green-500/10 border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.1)]',
        amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.1)]',
        purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.1)]'
    };

    return (
        <div className="glass p-6 rounded-[35px] border border-neutral-800/50 hover:border-neutral-700 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl border ${colorClasses[color as keyof typeof colorClasses]}`}>
                    {icon}
                </div>
                <TrendingUp className="w-4 h-4 text-neutral-600" />
            </div>
            <div className="space-y-1">
                <h3 className="text-neutral-500 text-[10px] font-black uppercase tracking-widest">{title}</h3>
                <p className="text-3xl font-black tracking-tighter">{value}</p>
            </div>
        </div>
    );
}

function formatSyncTime(dateStr: string) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    if (diff < 60000) return 'JUST NOW';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m AGO`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h AGO`;
    return date.toLocaleDateString();
}
