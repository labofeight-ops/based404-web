'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Link from 'next/link';

export default function HelpPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: 'Why should I switch from ChatGPT?',
            answer: 'ChatGPT is a tool. We\'re a vibe. Three AI agents with real personality, persistent memory that actually works, live web search, smart reminders, and they learn YOUR communication style over time. Plus your data stays between you and Telegram — we can\'t even access it.'
        },
        {
            question: 'Is my data actually private?',
            answer: 'Yes. We built it so we literally CANNOT access your conversations. Everything stays between you and your Telegram. Zero access on our end. That\'s not a policy, it\'s architecture.'
        },
        {
            question: 'What do I get with DOSED?',
            answer: '250 doses/day. All 3 agents. Blend Mode (3 perspectives at once). Live web search for real-time info. Persistent memory — it remembers you. Smart reminders. Personality adaptation — it learns how YOU talk. Everything you need.'
        },
        {
            question: 'What\'s different about OVERDOSED?',
            answer: '600 doses/day. Priority responses. Early access to new agents. API access to build your own stuff. VIP support. For power users who live in the bot.'
        },
        {
            question: 'What\'s Blend Mode?',
            answer: 'All 3 agents responding together. GHOST-7\'s speed + VOID-9\'s depth + PULSE-3\'s warmth. Three minds, one answer. Chaotic genius.'
        },
        {
            question: 'Does it actually remember me?',
            answer: 'Yes. Not session-based garbage. Real persistent memory. Come back tomorrow, next week, next month — it knows you, your preferences, your history.'
        },
        {
            question: 'Can it search the internet?',
            answer: 'Live web search. Real-time prices, news, scores, anything. No training cutoff date. Ask about today, get today\'s answer.'
        },
        {
            question: 'Can I set reminders?',
            answer: 'Natural language. "Remind me in 2 hours" or "motivate me every morning at 8am". It handles the rest.'
        },
        {
            question: 'What\'s your refund policy?',
            answer: '7 days, no questions. Not for you? Full refund. Simple.'
        },
        {
            question: 'How do I cancel?',
            answer: 'Subscription page. One click. Keep access until your period ends. Come back anytime.'
        },
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />

            <div className="max-w-3xl mx-auto px-4 sm:px-8 pt-24 pb-16">
                <h1 className="text-5xl font-black tracking-tight mb-4">FAQ</h1>
                <p className="text-zinc-400 mb-12">Quick answers. No fluff.</p>

                <div className="space-y-1">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-zinc-800">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full py-5 flex items-center justify-between text-left group"
                            >
                                <span className="font-medium text-lg group-hover:text-cyan-400 transition-colors pr-4">
                                    {faq.question}
                                </span>
                                <span className={`text-2xl text-zinc-500 transition-transform ${openIndex === index ? 'rotate-45' : ''}`}>
                                    +
                                </span>
                            </button>
                            {openIndex === index && (
                                <div className="pb-5">
                                    <p className="text-zinc-400 leading-relaxed">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-16 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl p-10 text-center">
                    <h2 className="text-2xl font-bold mb-3">Ready to feel the difference?</h2>
                    <p className="text-zinc-400 mb-6">Cancel ChatGPT. This hits different.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="https://t.me/BASED404BOT"
                            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl hover:opacity-90 transition-all"
                        >
                            Get Dosed
                        </a>
                        <a
                            href="mailto:support@based404.com"
                            className="px-8 py-3 border border-zinc-700 rounded-xl font-medium hover:bg-zinc-800 transition-colors"
                        >
                            Contact us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
