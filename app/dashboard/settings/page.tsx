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
        const sessionToken = localStorage.getItem('session_token');
        const userData = localStorage.getItem('user');

        if (!sessionToken || !userData) {
            router.push('/');
            return;
        }

        try {
            const parsed = JSON.parse(userData);
            setUser(parsed);
            setNickname(parsed.name || '');
        } catch (e) {
            router.push('/');
        }
        setLoading(false);
    }, [router]);

    const handleSaveNickname = async () => {
        if (!nickname.trim()) {
            setMessage('Nickname cannot be empty');
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
                // Update local storage
                const updatedUser = { ...user, name: nickname.trim() };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
                setMessage('Nickname updated successfully! The bot will now call you by this name.');
            } else {
                setMessage(data.error || 'Failed to update nickname');
            }
        } catch (error) {
            setMessage('Error updating nickname. Please try again.');
        }

        setSaving(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />

            <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-24 pb-16">
                <h1 className="text-4xl font-black tracking-tight mb-2">Settings</h1>
                <p className="text-zinc-400 mb-12">Manage your account preferences</p>

                {/* Profile Section */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 mb-6">
                    <h2 className="text-xl font-bold mb-6">Profile</h2>

                    {/* Nickname Field */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-zinc-400 mb-2">
                            Nickname
                        </label>
                        <p className="text-xs text-zinc-500 mb-3">
                            This is how the agents will address you in conversations
                        </p>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                placeholder="Enter your nickname"
                                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition-colors"
                                maxLength={50}
                            />
                            <button
                                onClick={handleSaveNickname}
                                disabled={saving}
                                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-zinc-700 rounded-lg font-medium transition-colors"
                            >
                                {saving ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                        {message && (
                            <p className={`mt-3 text-sm ${message.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                                {message}
                            </p>
                        )}
                    </div>

                    {/* Username (Read-only) */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-zinc-400 mb-2">
                            Telegram Username
                        </label>
                        <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-500">
                            @{user?.username || 'Not set'}
                        </div>
                        <p className="text-xs text-zinc-600 mt-2">
                            This is synced from your Telegram account
                        </p>
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">
                            Gender
                        </label>
                        <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-500">
                            {user?.gender || 'Not set'}
                        </div>
                        <p className="text-xs text-zinc-600 mt-2">
                            Update via /reset in the Telegram bot
                        </p>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-zinc-950 border border-red-900/30 rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-red-400 mb-4">Danger Zone</h2>
                    <p className="text-zinc-400 text-sm mb-4">
                        These actions cannot be undone
                    </p>
                    <button className="px-4 py-2 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors text-sm">
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
}
