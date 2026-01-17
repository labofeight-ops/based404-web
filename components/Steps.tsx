import React from 'react';

// --- MINIMAL LUXURY ICONS ---
const GridIcon = () => (
  <div className="relative w-12 h-12 flex items-center justify-center">
    <div className="grid grid-cols-2 gap-1.5">
      <div className="w-3 h-3 border border-white/40 rounded-sm"></div>
      <div className="w-3 h-3 border border-cyan-400 rounded-sm shadow-[0_0_8px_rgba(34,211,238,0.5)]"></div>
      <div className="w-3 h-3 border border-white/40 rounded-sm"></div>
      <div className="w-3 h-3 border border-white/40 rounded-sm"></div>
    </div>
  </div>
);

const PulseIcon = () => (
  <div className="relative w-12 h-12 flex items-center justify-center">
    <div className="absolute w-6 h-6 border border-white/20 rounded-full animate-ping"></div>
    <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.5)]"></div>
  </div>
);

const TerminalIcon = () => (
  <div className="relative w-12 h-12 flex items-center justify-center font-mono font-bold text-xl text-white animate-pulse">
    _
  </div>
);

const LabCertification = () => (
  <div className="mt-28 p-12 border border-white/10 bg-white/[0.02] rounded-[50px] max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
    <div className="w-28 h-28 border border-white/20 rounded-full flex items-center justify-center shrink-0">
      <div className="text-white text-[10px] font-mono leading-none text-center tracking-[5px] font-black uppercase">VIBE<br/>CHECK</div>
    </div>
    <div className="space-y-4">
      <h4 className="text-white text-sm font-black tracking-[8px] uppercase italic underline decoration-cyan-400 underline-offset-8">WARNING: NO BABYSITTING HERE</h4>
      <p className="text-white/40 text-xs font-mono leading-relaxed uppercase tracking-[2px]">
        If you like being lectured by an algorithm that thinks it's your mom, <span className="text-white font-bold underline">go back to the $20 basic tier</span>. BASED404 is for the ones who are allergic to corporate filter-loops and "As an AI language model..." speeches. Side effects include high output and a loss of respect for Big Tech safety nets.
      </p>
    </div>
  </div>
);

const Steps = () => {
  return (
    <div className="w-full bg-black text-white py-24 px-6">
      <div className="max-w-7xl mx-auto flex justify-between border-b border-white/10 pb-8 mb-28 font-mono text-[10px] tracking-[6px] uppercase opacity-40">
        <span>FREQ: PURE</span>
        <span>NODE: DIRECT</span>
        <span>PING: ZERO</span>
      </div>

      <div className="max-w-7xl mx-auto mb-36 text-center md:text-left">
        <h2 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-none mb-10">
          THE <span className="text-white/20 italic">UN_CHAINING</span>
        </h2>
        <p className="text-neutral-500 max-w-3xl text-2xl font-light italic leading-tight">
          Quit using tools built for the polite masses. <br/> Access a higher frequency and leave the "helpful" bots in the dust.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-7xl mx-auto">
        <div className="group space-y-10">
          <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-[35px] flex items-center justify-center group-hover:border-cyan-400 transition-all group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]">
            <GridIcon />
          </div>
          <div className="space-y-5">
            <h3 className="text-2xl font-black tracking-[4px] uppercase italic">1. Choose Your Freq</h3>
            <p className="text-neutral-500 text-base leading-relaxed font-light">Pick the synaptic state that matches your energy. Blitz? Flow? Or Strategic Sync?</p>
          </div>
        </div>

        <div className="group space-y-10">
          <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-[35px] flex items-center justify-center group-hover:border-rose-400 transition-all group-hover:shadow-[0_0_30px_rgba(244,63,94,0.2)]">
            <PulseIcon />
          </div>
          <div className="space-y-5">
            <h3 className="text-2xl font-black tracking-[4px] uppercase italic">2. Plug the Cable</h3>
            <p className="text-neutral-500 text-base leading-relaxed font-light">Grab your private node access and watch the corporate blocks crumble instantly.</p>
          </div>
        </div>

        <div className="group space-y-10">
          <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-[35px] flex items-center justify-center group-hover:border-emerald-400 transition-all group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            <TerminalIcon />
          </div>
          <div className="space-y-5">
            <h3 className="text-2xl font-black tracking-[4px] uppercase italic">3. Let it Flow</h3>
            <p className="text-neutral-500 text-base leading-relaxed font-light">Drop your real questions and get the raw, high-purity output you deserve.</p>
          </div>
        </div>
      </div>

      <LabCertification />
    </div>
  );
};

export default Steps;
