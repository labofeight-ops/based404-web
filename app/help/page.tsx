'use client';

import { useState } from 'react';
import Header from '@/components/Header';

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

export default function HelpPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState('all');

    const faqs: FAQItem[] = [
        // Getting Started
        {
            category: 'Getting Started',
            question: 'What is based404?',
            answer: 'based404 is a premium AI companion service on Telegram. We offer three unique AI agents with distinct personalities that can help you with advice, creative tasks, problem-solving, and more. Unlike generic AI chatbots, our agents have character, memory, and genuine personality.'
        },
        {
            category: 'Getting Started',
            question: 'How do I start using based404?',
            answer: 'Open Telegram and search for @BASED404BOT. Send /start to begin. You\'ll be asked for your name, gender (for personalized responses), and birth year. Then select an agent to start chatting!'
        },
        {
            category: 'Getting Started',
            question: 'What are the three agents?',
            answer: 'C-100: A high-energy, fast-thinking problem solver from NYC. Great for quick advice, business ideas, and getting things done fast. THC-1: A laid-back philosopher from California who sees deeper meanings and creative connections. Perfect for brainstorming and perspective. MOLLY-X: A warm, empathetic friend from London who creates genuine connection. Best for emotional support and honest conversations.'
        },

        // Agents & Features
        {
            category: 'Agents & Features',
            question: 'Can I switch between agents?',
            answer: 'Yes! Use /agent_c100, /agent_thc1, or /agent_molly to switch anytime. Your conversation history is preserved per agent. Premium users can also use Blend Mode which combines all three perspectives.'
        },
        {
            category: 'Agents & Features',
            question: 'What is Blend Mode?',
            answer: 'Blend Mode (/agent_blend) combines all three agent perspectives into one response. It\'s available for DOSED and OVERDOSED subscribers. Great when you want multiple viewpoints on a problem.'
        },
        {
            category: 'Agents & Features',
            question: 'Do agents remember our conversations?',
            answer: 'Yes! Agents remember your conversation history and key details about you (like your interests, preferences, and past topics). This memory persists across sessions. Use /reset to clear your history if needed.'
        },
        {
            category: 'Agents & Features',
            question: 'Can agents search the internet?',
            answer: 'Yes! Agents can perform web searches for current information like prices, news, and real-time data. Just ask questions that require current info (e.g., "what\'s the BTC price right now?").'
        },
        {
            category: 'Agents & Features',
            question: 'Can I set reminders?',
            answer: 'Yes! Just tell the agent naturally: "remind me to call mom in 2 hours" or "tell me a motivational quote every morning at 9am". You\'ll be asked to confirm before the reminder is set.'
        },
        {
            category: 'Agents & Features',
            question: 'Can I send images to agents?',
            answer: 'Yes! You can send photos and the agents will acknowledge and respond to them in character. Stickers are also supported with fun reactions.'
        },

        // Plans & Pricing
        {
            category: 'Plans & Pricing',
            question: 'What plans do you offer?',
            answer: 'FREE: 10 doses/day, 1 agent (C-100), basic features. DOSED ($9.99/month): 250 doses/day, all 3 agents, Blend Mode, web search, memory. OVERDOSED ($29.99/month): Unlimited doses, everything in DOSED plus custom agents and API access.'
        },
        {
            category: 'Plans & Pricing',
            question: 'What is a "dose"?',
            answer: 'A dose is one interaction with an agent. Each message you send costs approximately 0.25-0.5 doses depending on complexity. Simple questions cost less, complex requests or web searches cost more.'
        },
        {
            category: 'Plans & Pricing',
            question: 'When do my daily doses reset?',
            answer: 'Doses reset at midnight UTC every day. You can check your remaining doses with /profile or on the Usage page in your dashboard.'
        },
        {
            category: 'Plans & Pricing',
            question: 'How do I upgrade my plan?',
            answer: 'Use /upgrade in Telegram or visit the Subscription page in your dashboard. You can upgrade from FREE to DOSED, or from DOSED to OVERDOSED anytime. The new plan takes effect immediately.'
        },
        {
            category: 'Plans & Pricing',
            question: 'Can I downgrade my plan?',
            answer: 'Yes. Go to Subscription in your dashboard and choose downgrade. You\'ll keep your current plan until the end of your billing period, then switch to the lower plan.'
        },
        {
            category: 'Plans & Pricing',
            question: 'How do I cancel my subscription?',
            answer: 'Go to Subscription in your dashboard and click "Cancel Subscription". You\'ll keep access until your current billing period ends. Your data is preserved if you decide to come back.'
        },

        // Billing & Payments
        {
            category: 'Billing & Payments',
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit/debit cards (Visa, Mastercard, Amex) through Stripe. Payment is secure and PCI compliant.'
        },
        {
            category: 'Billing & Payments',
            question: 'Where can I see my invoices?',
            answer: 'Go to Subscription > Billing History in your dashboard. You can download PDF invoices for any payment.'
        },
        {
            category: 'Billing & Payments',
            question: 'How do I update my payment method?',
            answer: 'Go to Subscription > Payment Method in your dashboard. Click "Update Card" to change your payment details.'
        },
        {
            category: 'Billing & Payments',
            question: 'Is there a refund policy?',
            answer: 'We offer a 7-day money-back guarantee for new subscribers. If you\'re not satisfied, contact support within 7 days of your first payment for a full refund.'
        },

        // Account & Settings
        {
            category: 'Account & Settings',
            question: 'How do I change my nickname?',
            answer: 'Go to Settings in your dashboard and update your nickname. This syncs to the bot so agents will call you by your preferred name.'
        },
        {
            category: 'Account & Settings',
            question: 'How do I reset my profile?',
            answer: 'Use /reset in Telegram to clear your conversation history and profile. You\'ll go through onboarding again. This is useful if you want to start fresh.'
        },
        {
            category: 'Account & Settings',
            question: 'Can I delete my account?',
            answer: 'Yes. Go to Settings > Danger Zone and click "Delete Account". This permanently removes all your data. This action cannot be undone.'
        },
        {
            category: 'Account & Settings',
            question: 'How do I log into the dashboard?',
            answer: 'Click the login button on based404.com. You\'ll be redirected to Telegram to authorize. Once authorized, you\'re automatically logged in. No password needed!'
        },

        // Troubleshooting
        {
            category: 'Troubleshooting',
            question: 'Why is the agent not responding?',
            answer: 'Check if you\'ve selected an agent with /agent_c100, /agent_thc1, or /agent_molly. Also check if you have remaining doses with /profile. If issues persist, try /reset and start fresh.'
        },
        {
            category: 'Troubleshooting',
            question: 'Why did the agent give outdated information?',
            answer: 'For current info (prices, news, events), add "right now" or "today" to your question. This triggers a web search. Example: "what\'s the bitcoin price right now?"'
        },
        {
            category: 'Troubleshooting',
            question: 'The agent keeps repeating phrases. How do I fix this?',
            answer: 'Use /reset to clear your conversation history. Old patterns in the history can cause repetition. After reset, start fresh with /start.'
        },
        {
            category: 'Troubleshooting',
            question: 'I can\'t access premium features after paying.',
            answer: 'Subscription activation can take a few minutes. If it doesn\'t work after 10 minutes, log out and back into the dashboard, or contact support.'
        },

        // Privacy & Security
        {
            category: 'Privacy & Security',
            question: 'Is my data secure?',
            answer: 'Yes. We use encrypted connections, secure databases, and never share your data with third parties. Your conversations are private between you and the agents.'
        },
        {
            category: 'Privacy & Security',
            question: 'Do you store my conversations?',
            answer: 'We store recent conversation history to maintain context and memory. You can clear this anytime with /reset. Deleting your account removes all stored data.'
        },
        {
            category: 'Privacy & Security',
            question: 'How do I contact support?',
            answer: 'Email support@based404.com or use the /help command in Telegram. We typically respond within 24 hours.'
        },
    ];

    const categories = ['all', ...Array.from(new Set(faqs.map(f => f.category)))];

    const filteredFaqs = activeCategory === 'all'
        ? faqs
        : faqs.filter(f => f.category === activeCategory);

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />

            <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-24 pb-16">
                <h1 className="text-4xl font-black tracking-tight mb-2">Help & FAQs</h1>
                <p className="text-zinc-400 mb-8">Everything you need to know about based404</p>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === cat
                                    ? 'bg-cyan-500 text-white'
                                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                                }`}
                        >
                            {cat === 'all' ? 'All Topics' : cat}
                        </button>
                    ))}
                </div>

                {/* FAQ List */}
                <div className="space-y-3">
                    {filteredFaqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-zinc-900 transition-colors"
                            >
                                <div>
                                    <span className="text-xs text-cyan-400 mb-1 block">{faq.category}</span>
                                    <span className="font-medium">{faq.question}</span>
                                </div>
                                <svg
                                    className={`w-5 h-5 text-zinc-400 transition-transform ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {openIndex === index && (
                                <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-900/50">
                                    <p className="text-zinc-300 leading-relaxed">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Contact Support */}
                <div className="mt-12 bg-zinc-950 border border-zinc-800 rounded-2xl p-8 text-center">
                    <h2 className="text-2xl font-bold mb-3">Still need help?</h2>
                    <p className="text-zinc-400 mb-6">Our support team is here to help you</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="mailto:support@based404.com"
                            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-medium transition-colors"
                        >
                            Email Support
                        </a>
                        <a
                            href="https://t.me/BASED404BOT"
                            className="px-6 py-3 border border-zinc-700 hover:bg-zinc-800 rounded-lg font-medium transition-colors"
                        >
                            Message in Telegram
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
