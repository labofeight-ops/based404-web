'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function SettingsPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [nickname, setNickname] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const sessionToken = localStorage.getItem('session_token');
            if (!sessionToken) {
                router.push('/');
                return;
            }

            try {
                const res = await fetch('/api/user/me', {
                    headers: { 'Authorization': `Bearer ${sessionToken}` }
                });
                const data = await res.json();
                if (data.error) {
                    router.push('/');
                    return;
                }
                setUser(data);
                setNickname(data.name || '');
            } catch (e) {
                router.push('/');
            }
            setLoading(false);
        };
        fetchUser();
    }, [router]);

    const handleSaveNickname = async () => {
        if (!nickname.trim()) {
            setMessage('Give yourself a name first.');
            return;
        }

        setSaving(true);
        setMessage('');

        try {
            const sessionToken = localStorage.getItem('session_token');
            const response = await fetch('/api/user/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    session_token: sessionToken,
                    name: nickname.trim()
                }),
            });

            const data = await response.json();

            if (data.success) {
                const updatedUser = { ...user, name: nickname.trim() };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
                setMessage('Done. Agents will call you ' + nickname.trim() + ' now.');
            } else {
                setMessage(data.error || 'Something broke. Try again.');
            }
        } catch (error) {
            setMessage('Connection issue. Give it another shot.');
        }

        setSaving(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-cyan-400 animate-pulse">Loading your settings...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />

            <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-24 pb-16">
                <h1 className="text-4xl font-black tracking-tight mb-2">Settings</h1>
                <p className="text-zinc-400 mb-12">Tweak your profile. Make it yours.</p>

                {/* Profile Section */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 mb-8">
                    <h2 className="text-xl font-bold mb-2">Your identity</h2>
                    <p className="text-sm text-zinc-500 mb-8">How the agents see you.</p>

                    {/* Nickname Field */}
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                            What should we call you?
                        </label>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                placeholder="Your name or alias"
                                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                                maxLength={50}
                            />
                            <button
                                onClick={handleSaveNickname}
                                disabled={saving}
                                className="px-6 py-3.5 bg-white text-black hover:bg-zinc-200 disabled:bg-zinc-700 disabled:text-zinc-400 rounded-xl font-medium transition-colors"
                            >
                                {saving ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                        {message && (
                            <p className={`mt-3 text-sm ${message.includes('Done') ? 'text-green-400' : 'text-red-400'}`}>
                                {message}
                            </p>
                        )}
                    </div>

                    {/* Username (Read-only) */}
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                            Telegram handle
                        </label>
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3.5 text-zinc-400">
                            @{user?.username || 'not connected'}
                        </div>
                        <p className="text-xs text-zinc-600 mt-2">
                            Pulled from Telegram. Can't change it here.
                        </p>
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                            Gender
                        </label>
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3.5 text-zinc-400 capitalize">
                            {user?.gender || 'Not set'}
                        </div>
                        <p className="text-xs text-zinc-600 mt-2">
                            Want to change it? Use /reset in the bot and go through setup again.
                        </p>
                    </div>
                </div>

                {/* Preferences */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 mb-8">
                    <h2 className="text-xl font-bold mb-2">Preferences</h2>
                    <p className="text-sm text-zinc-500 mb-8">Fine-tune your experience.</p>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-xl">
                            <div>
                                <p className="font-medium">Dark mode</p>
                                <p className="text-sm text-zinc-500">It's always dark here.</p>
                            </div>
                            <div className="px-3 py-1 bg-zinc-700 rounded-full text-xs text-zinc-400">
                                Always on
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-xl">
                            <div>
                                <p className="font-medium">Notifications</p>
                                <p className="text-sm text-zinc-500">Reminders and updates hit you on Telegram.</p>
                            </div>
                            <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                                Active
                            </div>
                        </div>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-zinc-950 border border-red-900/30 rounded-2xl p-8">
                    <h2 className="text-xl font-bold text-red-400 mb-2">Danger zone</h2>
                    <p className="text-zinc-500 text-sm mb-6">
                        No going back from here. These actions are permanent.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-red-500/5 border border-red-900/30 rounded-xl">
                            <div>
                                <p className="font-medium text-red-400">Reset conversation history</p>
                                <p className="text-sm text-zinc-500">Wipe all memory. Start fresh.</p>
                            </div>
                            <button className="px-4 py-2 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors text-sm">
                                Reset
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-red-500/5 border border-red-900/30 rounded-xl">
                            <div>
                                <p className="font-medium text-red-400">Delete account</p>
                                <p className="text-sm text-zinc-500">Remove everything. Gone forever.</p>
                            </div>
                            <button className="px-4 py-2 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors text-sm">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
