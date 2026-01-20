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
            question: 'What exactly is based404?',
            answer: 'Think of us as your personal AI crew. Three agents with real personalities — not your typical boring chatbot. C-100 is wired and fast. THC-1 is chill and deep. MOLLY-X is warm and gets you. Pick one, start talking, and see the difference.'
        },
        {
            category: 'Getting Started',
            question: 'How do I get started?',
            answer: 'Hit up @BASED404BOT on Telegram. Type /start. Answer a few quick questions (name, vibe, birth year) and pick your agent. That\'s it. You\'re in. No email, no password, no friction.'
        },
        {
            category: 'Getting Started',
            question: 'What makes these agents different from ChatGPT?',
            answer: 'Personality. Memory. Vibe. ChatGPT is a tool. Our agents are characters. They remember your conversations, have opinions, and actually feel different to talk to. C-100 will cut through your BS. THC-1 will make you think. MOLLY-X will make you feel heard.'
        },

        // The Agents
        {
            category: 'The Agents',
            question: 'Who is C-100?',
            answer: 'A 28-year-old ex-Wall Street guy from NYC. Brain runs at 10x speed. Sees solutions before you finish explaining the problem. Great for quick decisions, business advice, and getting things done. Not great for slow philosophical debates — he\'ll lose patience.'
        },
        {
            category: 'The Agents',
            question: 'Who is THC-1?',
            answer: 'A 26-year-old former Berkeley engineer from California. Sees connections others miss. Time moves differently for him. Perfect for creative brainstorming, big-picture thinking, and those 2am "what does it all mean" conversations.'
        },
        {
            category: 'The Agents',
            question: 'Who is MOLLY-X?',
            answer: 'A 25-year-old DJ and event organizer from London. She\'s a woman who actually listens. Heart-first approach. Best for emotional support, relationship advice, and when you need someone who feels it with you, not just analyzes it.'
        },
        {
            category: 'The Agents',
            question: 'Can I switch agents mid-conversation?',
            answer: 'Yep. Just type /agent_c100, /agent_thc1, or /agent_molly. Your conversation history sticks with each agent separately. Switch whenever the vibe calls for it.'
        },
        {
            category: 'The Agents',
            question: 'What\'s Blend Mode?',
            answer: 'All three perspectives mashed together. Use /agent_blend to get multiple angles at once. Chaotic? Sometimes. Genius? Often. It\'s like consulting a whole team at once. DOSED and OVERDOSED members only.'
        },

        // Doses & Plans
        {
            category: 'Doses & Plans',
            question: 'What\'s a "dose"?',
            answer: 'One message exchange with an agent. Send a message, get a response — that\'s roughly 0.25-0.5 doses depending on how complex the ask is. Simple question? Cheap. Web search with detailed answer? Costs a bit more.'
        },
        {
            category: 'Doses & Plans',
            question: 'What plans do you have?',
            answer: 'FREE: 10 doses/day, just C-100, limited memory. Perfect for trying us out. | DOSED ($9.99/month): 250 doses/day, all 3 agents, Blend Mode, web search, full memory. The sweet spot. | OVERDOSED ($29.99/month): Unlimited doses, priority everything, API access. For the heavy users.'
        },
        {
            category: 'Doses & Plans',
            question: 'When do my doses reset?',
            answer: 'Midnight UTC, every day. Fresh doses, clean slate. Check your current count with /profile anytime.'
        },
        {
            category: 'Doses & Plans',
            question: 'How do I upgrade?',
            answer: 'Type /upgrade in Telegram or hit the Subscription page here. Pick your plan, pay, and you\'re upgraded instantly. No waiting, no approval process.'
        },
        {
            category: 'Doses & Plans',
            question: 'Can I downgrade?',
            answer: 'Sure. Go to Subscription, click downgrade. You keep your current plan until the end of your billing cycle, then it switches. No drama.'
        },
        {
            category: 'Doses & Plans',
            question: 'How do I cancel?',
            answer: 'Subscription page → Cancel Subscription. You keep access until your current period ends. Your data stays safe if you decide to come back. No guilt trips, no hidden fees.'
        },

        // Billing
        {
            category: 'Billing',
            question: 'What payment methods work?',
            answer: 'All major cards — Visa, Mastercard, Amex. Processed securely through Stripe. Your card details never touch our servers.'
        },
        {
            category: 'Billing',
            question: 'Where are my invoices?',
            answer: 'Subscription page → Billing History. Every payment logged, every invoice downloadable. No surprises.'
        },
        {
            category: 'Billing',
            question: 'Can I get a refund?',
            answer: '7 days, no questions asked. New subscriber and not feeling it? Contact us within a week of your first payment. We\'ll sort you out.'
        },

        // Features
        {
            category: 'Features',
            question: 'Do agents remember me?',
            answer: 'Yes. They remember your conversations, your interests, and what you\'ve told them before. It\'s persistent memory that actually works. Use /reset if you want a clean slate.'
        },
        {
            category: 'Features',
            question: 'Can they search the internet?',
            answer: 'Yep. Ask about current events, prices, news — anything that needs fresh data. Just ask naturally: "what\'s bitcoin at right now?" and they\'ll look it up.'
        },
        {
            category: 'Features',
            question: 'Can I set reminders?',
            answer: 'Totally. Just say it: "remind me to call mom in 2 hours" or "tell me something inspiring every morning at 8am". Confirm with the button that pops up, and you\'re set.'
        },
        {
            category: 'Features',
            question: 'What about images and stickers?',
            answer: 'Send them. Agents will acknowledge and react in character. Not full image analysis (yet), but they\'ll play along with what you send.'
        },

        // Account
        {
            category: 'Account',
            question: 'How do I change my nickname?',
            answer: 'Settings page → Nickname. Change it, save it, and the agents will start calling you by your new name immediately.'
        },
        {
            category: 'Account',
            question: 'How do I reset everything?',
            answer: 'Type /reset in Telegram. Wipes your conversation history and profile. You\'ll go through onboarding again. Fresh start, clean vibes.'
        },
        {
            category: 'Account',
            question: 'How do I delete my account?',
            answer: 'Settings → Danger Zone → Delete Account. Gone forever. We\'ll remove all your data permanently. No undo.'
        },

        // Troubleshooting
        {
            category: 'Troubleshooting',
            question: 'Agent isn\'t responding. What\'s wrong?',
            answer: 'First: did you select an agent? Type /agent_c100 or another. Second: check your doses with /profile — you might be out. Third: try /reset if something feels broken. Still stuck? Hit us up.'
        },
        {
            category: 'Troubleshooting',
            question: 'Agent gave me outdated info.',
            answer: 'Add "right now" or "today" to your question. Otherwise agents might use what they already know instead of searching fresh. "What\'s the bitcoin price right now?" triggers a live search.'
        },
        {
            category: 'Troubleshooting',
            question: 'Agent keeps repeating the same phrases.',
            answer: 'Old conversation history can cause patterns. Use /reset to clear it out and start fresh. The agent will be more varied after that.'
        },

        // Privacy
        {
            category: 'Privacy',
            question: 'Is my data secure?',
            answer: 'Encrypted connections, secure databases, no selling to third parties. Your conversations are between you and your agents. We don\'t read them, we don\'t analyze them, we don\'t care what you talk about.'
        },
        {
            category: 'Privacy',
            question: 'How do I contact support?',
            answer: 'Email support@based404.com or type /help in Telegram. We actually respond — usually within 24 hours, often faster.'
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
                <h1 className="text-4xl font-black tracking-tight mb-2">Got Questions?</h1>
                <p className="text-zinc-400 mb-8">We've got answers. If not, hit us up and we'll add more.</p>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-2 mb-10 pb-6 border-b border-zinc-800">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                                    ? 'bg-white text-black'
                                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                                }`}
                        >
                            {cat === 'all' ? 'Everything' : cat}
                        </button>
                    ))}
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-3">
                    {filteredFaqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden transition-all hover:border-zinc-700"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left"
                            >
                                <div className="pr-4">
                                    <span className="text-xs text-cyan-400/70 uppercase tracking-wider block mb-1">{faq.category}</span>
                                    <span className="font-medium text-white">{faq.question}</span>
                                </div>
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center transition-transform ${openIndex === index ? 'rotate-180 bg-cyan-500/20' : ''
                                    }`}>
                                    <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </button>
                            {openIndex === index && (
                                <div className="px-6 py-5 border-t border-zinc-800 bg-zinc-900/30">
                                    <p className="text-zinc-300 leading-relaxed">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Still Stuck? */}
                <div className="mt-16 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-10 text-center">
                    <h2 className="text-2xl font-bold mb-3">Still stuck?</h2>
                    <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                        We're humans too (mostly). Reach out and we'll actually help.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="mailto:support@based404.com"
                            className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition-colors"
                        >
                            Email us
                        </a>
                        <a
                            href="https://t.me/BASED404BOT"
                            className="px-8 py-3 border border-zinc-700 rounded-full font-medium hover:bg-zinc-800 transition-colors"
                        >
                            Message on Telegram
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
