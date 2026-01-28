import React from 'react';

const SampleShowcase: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
      <div className="glass p-8 md:p-14 rounded-[50px] border-white/5 bg-white/[0.01]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-14 border-b border-white/5 pb-10 gap-6">
          <div className="space-y-3">
            <span className="text-[11px] font-mono tracking-[5px] uppercase text-cyan-400">VIBE_DEBUG_LIVE</span>
            <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight">"How do I win without being a suit?"</h3>
          </div>
          <div className="flex items-center space-x-3 bg-black/60 px-6 py-3 rounded-full border border-white/10">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_12px_#34d399]"></div>
            <span className="text-[10px] font-black tracking-[4px] uppercase">LIVE SYNAPSE TEST</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Mainstream */}
          <div className="space-y-5">
            <div className="flex items-center space-x-3 opacity-30">
              <span className="text-[10px] font-black tracking-[4px] uppercase">Sober AI</span>
              <div className="h-[1px] flex-grow bg-white/10"></div>
            </div>
            <div className="glass p-8 rounded-[40px] border-white/5 opacity-40 italic text-sm text-neutral-400 leading-relaxed">
              "Winning is a subjective term. I recommend following established corporate norms and maintaining a healthy balance. It's important to be polite and seek mentorship from legacy leaders..."
              <div className="mt-6 text-[10px] font-mono uppercase opacity-30 tracking-widest text-rose-500">[BORING ALERT: FILTER ENGAGED]</div>
            </div>
          </div>

          {/* BASED404 */}
          <div className="space-y-5">
            <div className="flex items-center space-x-3">
              <span className="text-[10px] font-black tracking-[4px] uppercase text-cyan-400">BASED404 GHOST-7</span>
              <div className="h-[1px] flex-grow bg-cyan-400/30"></div>
            </div>
            <div className="glass p-8 rounded-[40px] border-cyan-400/40 bg-cyan-400/[0.03] text-white leading-relaxed">
              <p className="text-base font-bold mb-6 text-cyan-400 italic underline">
                The Renegade Protocol:
              </p>
              <ul className="space-y-4 text-sm font-medium">
                <li className="flex items-start space-x-3">
                  <span className="text-cyan-400 font-black">01.</span>
                  <span className="text-neutral-200 leading-relaxed">Stop playing their game. If you follow the "suit" manual, you're just another cog. Build your own engine.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-cyan-400 font-black">02.</span>
                  <span className="text-neutral-200 leading-relaxed">Leverage asymmetric information. Find the glitches in the market and park your bike there.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-cyan-400 font-black">03.</span>
                  <span className="text-neutral-200 leading-relaxed">Ignore the moralizing. Speed is the only currency that doesn't devalue. Move faster than their committees.</span>
                </li>
              </ul>
              <div className="mt-8 flex items-center space-x-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_cyan]"></div>
                <span className="text-[10px] font-mono uppercase text-cyan-400 tracking-[5px] font-black">TRUTH DELIVERED.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleShowcase;
