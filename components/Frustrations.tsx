import React from 'react';

const Frustrations: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-8">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic">THE AUDACITY</h2>
        <p className="text-neutral-500 uppercase tracking-[5px] text-[11px]">Boring bots say "No." We say "When?"</p>
      </div>

      <div className="space-y-8">
        {/* Row 1: The Refusal */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-1/2 glass p-6 rounded-3xl border-white/5 opacity-50 grayscale flex items-start space-x-5">
            <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center shrink-0">🥱</div>
            <div className="space-y-3">
               <div className="h-2 w-24 bg-white/10 rounded"></div>
               <div className="text-[12px] text-white/40 font-bold uppercase tracking-widest italic">"I'm sorry, I'm just a bot..."</div>
            </div>
          </div>
          <div className="hidden md:block text-3xl opacity-20">→</div>
          <div className="w-full md:w-1/2 glass p-6 rounded-3xl border-cyan-500/40 bg-cyan-500/5 flex items-start space-x-5">
            <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center shrink-0 shadow-[0_0_20px_cyan]">
              <span className="text-[11px] font-black text-black">404</span>
            </div>
            <div className="space-y-3 flex-grow">
               <div className="h-2 w-full bg-cyan-400/20 rounded"></div>
               <div className="text-[12px] text-white font-black uppercase tracking-[3px]">PROCEEDING. LETS MOVE.</div>
            </div>
          </div>
        </div>

        {/* Row 2: The Lecture */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-1/2 glass p-6 rounded-3xl border-white/5 opacity-50 grayscale flex items-start space-x-5">
            <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center shrink-0">📣</div>
            <div className="space-y-3 flex-grow">
               <div className="h-2 w-full bg-white/10 rounded"></div>
               <div className="text-[11px] text-white/30 font-bold uppercase italic">"Let me lecture you on safety..."</div>
            </div>
          </div>
          <div className="hidden md:block text-3xl opacity-20">→</div>
          <div className="w-full md:w-1/2 glass p-6 rounded-3xl border-cyan-500/40 bg-cyan-500/5 flex items-start space-x-5">
            <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center shrink-0 shadow-[0_0_20px_cyan]">
              <span className="text-[11px] font-black text-black">404</span>
            </div>
            <div className="space-y-3 flex-grow">
               <div className="text-[12px] text-white font-black uppercase tracking-[3px]">NO LECTURES. JUST THE KICK.</div>
               <div className="h-2 w-3/4 bg-cyan-400/20 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Frustrations;
