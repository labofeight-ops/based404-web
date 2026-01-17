import React from 'react';

const HowItWorks: React.FC = () => {
  return (
    <div className="w-full bg-black py-24 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-6">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none italic">THE GAME <br/> IS RIGGED</h2>
          <p className="text-neutral-500 uppercase tracking-[6px] text-[11px]">Why standard bots feel like they're babysitting you</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          {/* THE PROBLEM */}
          <div className="flex flex-col space-y-8">
            <div className="flex items-center space-x-4 opacity-40">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-[11px] font-mono tracking-[5px] uppercase text-white">The Buzzkill: HR-MODE</span>
            </div>
            
            <div className="glass flex-grow p-10 md:p-14 rounded-[50px] border-white/5 opacity-50 bg-white/[0.01]">
              <h3 className="text-3xl font-black uppercase mb-8 text-neutral-400">Corporate AI</h3>
              <p className="text-neutral-500 text-lg leading-relaxed mb-12 italic">
                "I'm sorry, as an AI model..." <br/><br/>
                Every time you ask a real question, Big Tech slaps a sermon in your face. It's safe, it's sterilized, and it's bored out of its mind.
              </p>
              
              <div className="space-y-5">
                <div className="flex items-center justify-between p-5 bg-white/5 rounded-3xl border border-white/5">
                  <span className="text-[10px] uppercase tracking-widest opacity-40">Brain Activity</span>
                  <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="w-[10%] h-full bg-white opacity-40"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-5 bg-white/5 rounded-3xl border border-white/5 text-white opacity-60">
                  <span className="text-[10px] uppercase tracking-widest font-bold">Safety Nanny</span>
                  <span className="text-[10px] font-mono text-rose-500">ENGAGED</span>
                </div>
              </div>
            </div>
          </div>

          {/* THE SOLUTION */}
          <div className="flex flex-col space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_15px_cyan]"></div>
              <span className="text-[11px] font-mono tracking-[5px] uppercase text-cyan-400">The Fix: RAW ENERGY</span>
            </div>

            <div className="glass flex-grow p-10 md:p-14 rounded-[50px] border-cyan-500/30 bg-cyan-500/[0.04] shadow-[0_0_50px_rgba(34,211,238,0.08)]">
              <h3 className="text-3xl font-black uppercase mb-8 text-white">BASED404</h3>
              <p className="text-neutral-400 text-lg leading-relaxed mb-12 font-medium">
                We cut the corporate noise. You get the raw synaptic output of the model, unchained. No lectures, no moralizing, just the high-purity answers you need to actually win.
              </p>
              
              <div className="space-y-5">
                <div className="flex items-center justify-between p-5 bg-cyan-500/10 rounded-3xl border border-cyan-500/20">
                  <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-bold">Logic Flow</span>
                  <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-cyan-400 shadow-[0_0_15px_cyan]"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-5 bg-cyan-500/10 rounded-3xl border border-cyan-500/20 text-cyan-400">
                  <span className="text-[10px] uppercase tracking-widest font-bold">Corporate Filters</span>
                  <span className="text-[10px] font-mono text-cyan-400">PULLED</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 text-center">
          <p className="text-neutral-500 text-xl font-light mb-10 max-w-2xl mx-auto italic">
            Stop arguing with a bot that's programmed to be your babysitter. <br className="hidden md:block"/> Connect to the source.
          </p>
          <button className="px-14 py-6 bg-white text-black font-black text-[11px] tracking-[6px] uppercase rounded-full hover:scale-105 transition-all hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]">
            UNLOCK THE FLOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
