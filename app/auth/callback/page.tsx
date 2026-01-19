'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthCallback() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const token = searchParams.get('token');

        if (!token) {
            setStatus('error');
            setErrorMessage('No authentication token provided');
            return;
        }

        // Verify token with backend
        fetch('/api/auth/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    // Store session
                    localStorage.setItem('session_token', data.sessionToken);
                    localStorage.setItem('user', JSON.stringify(data.user));

                    setStatus('success');

                    // Redirect to dashboard
                    setTimeout(() => {
                        router.push('/dashboard');
                    }, 1000);
                } else {
                    setStatus('error');
                    setErrorMessage(data.error || 'Authentication failed');
                }
            })
            .catch(err => {
                setStatus('error');
                setErrorMessage('Network error');
            });
    }, [searchParams, router]);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="text-center max-w-md">
                {status === 'verifying' && (
                    <>
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400 mx-auto mb-6"></div>
                        <h1 className="text-white text-2xl font-bold mb-2">Authenticating...</h1>
                        <p className="text-zinc-400">Verifying your session</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div className="text-green-400 text-7xl mb-6">✓</div>
                        <h1 className="text-white text-2xl font-bold mb-2">Success!</h1>
                        <p className="text-zinc-400">Redirecting to your dashboard...</p>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className="text-red-400 text-7xl mb-6">✗</div>
                        <h1 className="text-white text-2xl font-bold mb-2">Authentication Failed</h1>
                        <p className="text-zinc-400 mb-6">{errorMessage}</p>
                        <button
                            onClick={() => router.push('/')}
                            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors font-semibold"
                        >
                            Return Home
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
