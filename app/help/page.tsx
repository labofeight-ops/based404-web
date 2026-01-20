'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Link from 'next/link';

interface FAQItem {
    question: string;
    answer: string;
}

export default function HelpPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs: FAQItem[] = [
        {
            question: 'What makes based404 different from ChatGPT?',
            answer: 'Personality. Three AI agents with actual character — not corporate robots reading scripts. They have opinions, remember you, and feel different to talk to. ChatGPT is a tool. We\'re a vibe.'
        },
        {
            question: 'Is my data private?',
            answer: 'Your conversations stay between you and your Telegram. We literally cannot access your messages. Zero. None. That\'s not a policy — it\'s how we built it. Your data is yours.'
        },
        {
            question: 'What are doses?',
            answer: 'One message = roughly one dose. FREE gets 10/day, DOSED gets 250/day, OVERDOSED gets 600/day. Resets at midnight UTC.'
        },
        {
            question: 'Can the agents search the internet?',
            answer: 'Yes. Ask anything that needs fresh data — prices, news, scores, weather. They\'ll look it up live. No outdated training cutoff BS.'
        },
        {
            question: 'Do agents remember me?',
            answer: 'Yes. Your conversations, preferences, topics — it sticks. Come back tomorrow, pick up where you left off. Real memory, not session-based garbage.'
        },
        {
            question: 'What\'s Blend Mode?',
            answer: 'All three agents responding at once. Three perspectives, one answer. Chaotic genius. DOSED and OVERDOSED only.'
        },
        {
            question: 'Can I set reminders?',
            answer: 'Yep. Just say it naturally: "remind me in 2 hours" or "motivate me every morning at 8am". The agent handles the rest.'
        },
        {
            question: 'How do I switch agents?',
            answer: 'Type /agent_c100, /agent_thc1, or /agent_molly. Instant switch. Different vibes for different moods.'
        },
        {
            question: 'What\'s the refund policy?',
            answer: '7 days, no questions. Not feeling it? We\'ll refund you. Simple.'
        },
        {
            question: 'How do I cancel?',
            answer: 'Subscription page → Cancel. Keep access until your period ends. Come back anytime.'
        },
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />

            <div className="max-w-3xl mx-auto px-4 sm:px-8 pt-24 pb-16">
                <h1 className="text-5xl font-black tracking-tight mb-3">FAQ</h1>
                <p className="text-zinc-400 mb-12">Quick answers. No fluff.</p>

                {/* FAQ Accordion */}
                <div className="space-y-2">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border-b border-zinc-800"
                        >
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
                <div className="mt-16 text-center">
                    <p className="text-zinc-500 mb-6">Still have questions?</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="mailto:support@based404.com"
                            className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition-colors"
                        >
                            Email us
                        </a>
                        <a
                            href="https://t.me/BASED404BOT"
                            className="px-6 py-3 border border-zinc-700 rounded-full font-medium hover:bg-zinc-800 transition-colors"
                        >
                            Try the bot
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
