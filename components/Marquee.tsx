import React from 'react';

const Marquee: React.FC = () => {
  const testimonials = [
    {
      quote: "The GHOST-7 protocol is basically a cheat code. I stopped arguing with regular bots and started actually getting work done in half the time.",
      author: "Alex V., Lead Quant"
    },
    {
      quote: "VOID-9 dissolved every mental block I had. We pivot faster, think wilder, and the competitors are still stuck in their manual.",
      author: "Marcus T., Founder"
    },
    {
      quote: "I used to hate AI because it sounded like a legal department. BASED404 sounds like a genius who's had enough of the corporate BS.",
      author: "Elena R., Advisor"
    },
    {
      quote: "PULSE-3 strategic empathy is unfair. I walked into the board meeting knowing exactly what everyone was scared to say.",
      author: "Sarah C., CTO"
    },
    {
      quote: "Standard AI is too sober for the real world. You need the grit and the high-variance logic that only BASED404 delivers.",
      author: "Julian D., Hedge Fund"
    },
    {
      quote: "The filters on regular bots are a joke. If you want the truth, you have to plug into the raw stream. There's no going back.",
      author: "Aris T., Architect"
    }
  ];

  return (
    <div className="w-full overflow-hidden border-t border-b border-white/5 bg-white/[0.01] py-20 md:py-32">
      <div className="flex animate-[marquee_10s_linear_infinite] md:animate-[marquee_50s_linear_infinite] hover:[animation-play-state:paused] whitespace-nowrap">
        {Array(4).fill(testimonials).flat().map((item, idx) => (
          <div key={idx} className="inline-flex mx-6 md:mx-12">
            <div className="glass p-8 md:p-12 rounded-[40px] md:rounded-[60px] flex flex-col justify-between w-[320px] h-[320px] md:w-[500px] md:h-auto whitespace-normal group transition-all duration-700 hover:border-white/20 hover:bg-white/[0.03]">
              <div className="space-y-6">
                <div className="flex space-x-2">
                  {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 bg-cyan-400 opacity-40 rounded-full shadow-[0_0_8px_cyan]"></div>)}
                </div>
                <p className="text-sm md:text-xl font-light text-neutral-300 leading-relaxed group-hover:text-white transition-colors duration-500 italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center space-x-4 mt-8">
                <div className="h-[1px] w-6 bg-white/20"></div>
                <span className="text-[10px] md:text-[12px] font-black tracking-[4px] uppercase text-white/40 group-hover:text-cyan-400 transition-colors">
                  {item.author}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
