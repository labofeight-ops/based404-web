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

// Extra Icons
const MessageSquare = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
);
const Globe = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
);

interface AnalyticsData {
    stats: {
        totalUsers: number;
        active24h: number;
        liveVisitors: number;
        liveChatting: number;
        mrr: number;
        xUsage: {
            remaining: string | number;
            limit: string | number;
            reset: string;
        };
    };
    subscriptions: Array<{ subscription: string; count: string }>;
    agents: Array<{ chosen_agent: string; count: string }>;
    referrers: Array<{ source: string; count: string }>;
    growthTrend: Array<{ date: string; count: string }>;
    recentUsers: Array<{
        user_id: string;
        username: string;
        name: string;
        subscription: string;
        source: string;
        last_active: string;
    }>;
}

export default function AdminPage() {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('daily');

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
        console.log('[FRONTEND] Fetching analytics...');
        try {
            const response = await fetch('/api/admin/analytics', {
                headers: {
                    'Authorization': 'Pedro123'
                }
            });
            if (response.ok) {
                const json = await response.json();
                console.log('[FRONTEND] Received data:', json);
                setData(json);
                setError('');
            } else {
                const errJson = await response.json().catch(() => ({}));
                setError(`API Error: ${response.status} - ${errJson.details || errJson.error || 'Unknown error'}`);
            }
        } catch (err: any) {
            console.error('[FRONTEND] Fetch error:', err);
            setError(`Network Error: ${err.message}`);
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
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500 transition-all font-mono"
                                autoFocus
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm text-center font-medium bg-red-500/10 p-4 rounded-2xl border border-red-500/20">{error}</p>}
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
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
                    <p className="text-cyan-500 font-black uppercase italic tracking-widest text-xs animate-pulse">Syncing Neural Data...</p>
                </div>
            </div>
        );
    }

    const totalUsers = data?.stats.totalUsers || 0;
    const arpu = data ? (data.stats.mrr / (totalUsers || 1)).toFixed(2) : 0;
    const ltv = (parseFloat(arpu.toString()) * 24).toFixed(0);

    return (
        <div className="min-h-screen bg-black text-white p-4 sm:p-8 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-black italic uppercase tracking-tighter flex items-center gap-3">
                            <Shield className="text-cyan-400 w-10 h-10" />
                            NEURAL ASSETS <span className="text-cyan-400">ADMIN</span>
                        </h1>
                        <p className="text-neutral-500 font-medium tracking-widest text-[10px]">REAL-TIME PERFORMANCE MONITORING v2.1</p>
                    </div>
                    <div className="flex items-center gap-3 bg-neutral-900/50 p-2 rounded-2xl border border-neutral-800">
                        {error && (
                            <div className="px-4 py-2 bg-red-500/10 rounded-xl border border-red-500/20 flex items-center gap-2">
                                <Activity className="w-3 h-3 text-red-500" />
                                <span className="text-[10px] text-red-500 font-bold uppercase truncate max-w-[200px]">{error}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-xl border border-green-500/20">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                            <span className="text-green-500 text-xs font-bold uppercase tracking-widest">
                                {data?.stats.liveVisitors || 0} LIVE / {data?.stats.liveChatting || 0} CHATTING
                            </span>
                        </div>
                        <button
                            onClick={fetchData}
                            className="p-2 hover:bg-white/5 rounded-xl transition-all"
                        >
                            <Activity className={`w-5 h-5 text-neutral-400 ${loading ? 'animate-pulse' : ''}`} />
                        </button>
                    </div>
                </div>

                {/* STATS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <StatsCard
                        title="TOTAL ASSETS"
                        value={totalUsers}
                        icon={<Users className="w-5 h-5" />}
                        color="cyan"
                        sub={`ARPU: $${arpu}`}
                    />
                    <StatsCard
                        title="LIVE ACTIVITY"
                        value={data?.stats.liveChatting || 0}
                        icon={<MessageSquare className="w-5 h-5" />}
                        color="green"
                        sub="Currently Interacting"
                    />
                    <StatsCard
                        title="PROJECTED MRR"
                        value={`$${data?.stats.mrr || 0}`}
                        icon={<DollarSign className="w-5 h-5" />}
                        color="amber"
                        sub={`LTV: $${ltv}/user`}
                    />
                    <StatsCard
                        title="GROWTH RATE"
                        value="+24.8%"
                        icon={<TrendingUp className="w-5 h-5" />}
                        color="purple"
                        sub="Last 30 days"
                    />
                    <StatsCard
                        title="X API CREDITS"
                        value={data?.stats.xUsage?.remaining || 'N/A'}
                        icon={<Zap className="w-5 h-5" />}
                        color="cyan"
                        sub={`LIMIT: ${data?.stats.xUsage?.limit || '?'}`}
                    />
                </div>

                {/* MAIN ANALYTICS SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* ASSET GROWTH CHART */}
                    <div className="glass p-8 rounded-[40px] border border-neutral-800/50 lg:col-span-2">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-black uppercase italic tracking-tighter">Asset Growth</h3>
                                <p className="text-neutral-500 text-[10px] font-bold tracking-widest uppercase">New user registrations over time</p>
                            </div>
                            <div className="flex gap-2">
                                {['daily', 'weekly', 'monthly'].map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setTimeframe(t as any)}
                                        className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all ${timeframe === t ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'bg-neutral-900 text-neutral-500'
                                            }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="h-64 flex items-end justify-between gap-1 relative pt-8">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-neutral-800/50" />
                            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-neutral-800/20" />

                            {data?.growthTrend && data.growthTrend.length > 0 ? data.growthTrend.map((day, idx) => {
                                const maxCount = Math.max(...data.growthTrend.map(d => parseInt(d.count)), 1);
                                const height = (parseInt(day.count) / maxCount) * 100;
                                return (
                                    <div key={idx} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                                        <div className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white text-black px-2 py-1 rounded text-[10px] font-black z-20">
                                            {day.count} SIGNUPS
                                        </div>
                                        <div
                                            className="w-full bg-cyan-500/20 group-hover:bg-cyan-500/50 rounded-t-lg transition-all duration-500 relative min-h-[4px]"
                                            style={{ height: `${height}%` }}
                                        >
                                            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <span className="text-[8px] text-neutral-600 font-bold uppercase mt-2 rotate-45 origin-left">
                                            {new Date(day.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                        </span>
                                    </div>
                                )
                            }) : (
                                <div className="w-full h-full flex items-center justify-center text-neutral-700 font-black uppercase italic tracking-widest text-sm">
                                    No Growth Data Synchronized
                                </div>
                            )}
                        </div>
                    </div>

                    {/* TRAFFIC SOURCES */}
                    <div className="glass p-8 rounded-[40px] border border-neutral-800/50">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-black uppercase italic tracking-tighter text-purple-400">Referrers</h3>
                                <p className="text-neutral-500 text-[10px] font-bold tracking-widest uppercase">Where assets originate</p>
                            </div>
                            <Globe className="w-5 h-5 text-purple-500" />
                        </div>

                        <div className="space-y-6">
                            {data?.referrers.map(ref => (
                                <div key={ref.source} className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${ref.source === 'google' ? 'bg-red-500' :
                                                ref.source === 'X' || ref.source === 'twitter' ? 'bg-white' :
                                                    ref.source === 'direct' ? 'bg-cyan-500' : 'bg-purple-500'
                                                }`} />
                                            <span className="text-xs font-black uppercase tracking-widest">{ref.source}</span>
                                        </div>
                                        <span className="text-xs font-mono text-neutral-400">{ref.count}</span>
                                    </div>
                                    <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden border border-neutral-800">
                                        <div
                                            className="h-full bg-neutral-700 group-hover:bg-cyan-500 transition-all rounded-full"
                                            style={{
                                                width: `${(parseInt(ref.count) / (totalUsers || 1)) * 100}%`,
                                                backgroundColor: ref.source === 'direct' ? '#06b6d4' : (ref.source === 'X' ? '#ffffff' : '#a855f7')
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* VISUALS SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* SUBSCRIPTION MIX */}
                    <div className="glass p-6 rounded-[30px] border border-neutral-800/50 lg:col-span-1">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-black uppercase text-neutral-400 tracking-wider flex items-center gap-2">
                                <BarChart3 className="w-4 h-4" /> REVENUE MIX
                            </h3>
                        </div>
                        <div className="space-y-4">
                            {['ELITE', 'OVERDOSED', 'PRO', 'DOSED', 'FREE'].map(tier => {
                                const sub = data?.subscriptions.find(s => s.subscription === tier);
                                if (!sub && tier !== 'FREE' && tier !== 'PRO' && tier !== 'ELITE') return null;

                                const count = sub ? sub.count : '0';
                                return (
                                    <div key={tier} className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold">
                                            <span className="text-neutral-300">{tier}</span>
                                            <span className="text-white">{count}</span>
                                        </div>
                                        <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden border border-neutral-800">
                                            <div
                                                className={`h-full rounded-full ${tier.includes('ELITE') || tier.includes('OVERDOSED') ? 'bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]' :
                                                    tier.includes('PRO') || tier.includes('DOSED') ? 'bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]' :
                                                        'bg-neutral-600'
                                                    }`}
                                                style={{ width: `${(parseInt(count) / (totalUsers || 1)) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* AGENT DOMINANCE */}
                    <div className="glass p-6 rounded-[30px] border border-neutral-800/50 lg:col-span-1">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-black uppercase text-neutral-400 tracking-wider flex items-center gap-2">
                                <Zap className="w-4 h-4" /> AGENT PENETRATION
                            </h3>
                        </div>
                        <div className="space-y-4">
                            {data?.agents.map(agent => (
                                <div key={agent.chosen_agent} className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black border ${agent.chosen_agent === 'GHOST-7' ? 'bg-white/5 border-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]' :
                                        agent.chosen_agent === 'VOID-9' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)]' :
                                            'bg-purple-500/10 border-purple-500/20 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.1)]'
                                        }`}>
                                        {agent.chosen_agent.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-black tracking-widest uppercase">{agent.chosen_agent}</p>
                                        <p className="text-[10px] text-neutral-500 font-bold uppercase">{Math.round((parseInt(agent.count) / (totalUsers || 1)) * 100)}% Usage</p>
                                    </div>
                                    <span className="text-xs font-mono font-bold text-neutral-400">{agent.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* REAL-TIME FEED */}
                    <div className="glass p-6 rounded-[30px] border border-neutral-800/50 lg:col-span-1">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-black uppercase text-neutral-400 tracking-wider flex items-center gap-2">
                                <Activity className="w-4 h-4" /> LIVE ACTIVITY STREAM
                            </h3>
                        </div>
                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {data?.recentUsers.map(user => (
                                <div key={user.user_id} className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-neutral-800 rounded-lg flex items-center justify-center relative overflow-hidden">
                                            <User className="w-4 h-4 text-neutral-400" />
                                            {new Date(user.last_active).getTime() > Date.now() - 120000 && (
                                                <div className="absolute inset-0 bg-green-500/20 animate-pulse" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase italic tracking-tighter">@{user.username || 'anon_subject'}</p>
                                            <p className="text-[10px] text-neutral-500 font-bold uppercase">{user.source || 'direct'}</p>
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

                {/* USER DATA TABLE */}
                <div className="glass p-8 rounded-[40px] border border-neutral-800/50">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div>
                            <h3 className="text-xl font-black uppercase italic tracking-tighter">Neural Registry</h3>
                            <p className="text-neutral-500 text-[10px] font-bold tracking-widest uppercase mt-1">Full database synchronization successful</p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-neutral-800 text-neutral-500 text-[10px] font-black uppercase tracking-widest">
                                    <th className="px-4 py-4">Subject ID</th>
                                    <th className="px-4 py-4">Identity Meta</th>
                                    <th className="px-4 py-4">Tier Level</th>
                                    <th className="px-4 py-4">Origin Point</th>
                                    <th className="px-4 py-4">Last Sync</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-800/50">
                                {data?.recentUsers.map((user: any) => (
                                    <tr key={user.user_id} className="hover:bg-white/5 transition-all group">
                                        <td className="px-4 py-4 font-mono text-xs text-neutral-500 font-bold">#{user.user_id}</td>
                                        <td className="px-4 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-black uppercase italic">{user.name || 'UNLISTED OBJECT'}</span>
                                                <span className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest">@{user.username || 'unknown'}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${user.subscription === 'ELITE' || user.subscription === 'OVERDOSED' ? 'text-purple-400' :
                                                user.subscription === 'PRO' || user.subscription === 'DOSED' ? 'text-cyan-400' :
                                                    'text-neutral-500'
                                                }`}>
                                                {user.subscription}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="text-xs font-mono font-bold text-neutral-400 tracking-tighter">{user.source || 'DIRECT'}</span>
                                        </td>
                                        <td className="px-4 py-4 text-[10px] text-neutral-400 font-bold">
                                            {formatSyncTime(user.last_active)}
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
                    background: rgba(10, 10, 10, 0.75);
                    backdrop-filter: blur(40px);
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

function StatsCard({ title, value, icon, color, sub }: { title: string; value: string | number; icon: React.ReactNode; color: string; sub: string }) {
    const colorClasses = {
        cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)]',
        green: 'text-green-400 bg-green-500/10 border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.1)]',
        amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.1)]',
        purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.1)]'
    };

    return (
        <div className="glass p-6 rounded-[35px] border border-neutral-800/50 hover:border-neutral-700 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl border ${colorClasses[color as keyof typeof colorClasses]}`}>
                    {icon}
                </div>
                <div className="w-12 h-6 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                </div>
            </div>
            <div className="space-y-1">
                <h3 className="text-neutral-500 text-[10px] font-black uppercase tracking-widest">{title}</h3>
                <p className="text-2xl font-black tracking-tighter group-hover:text-cyan-400 transition-colors uppercase italic truncate">{value}</p>
                <p className="text-[9px] text-neutral-600 font-bold uppercase tracking-widest italic truncate">{sub}</p>
            </div>
        </div>
    );
}

function formatSyncTime(dateStr: string) {
    if (!dateStr) return 'NEVER';
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    if (diff < 60000) return 'JUST NOW';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m AGO`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h AGO`;
    return date.toLocaleDateString();
}
