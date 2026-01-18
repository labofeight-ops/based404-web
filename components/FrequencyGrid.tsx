"use client"

import type React from "react"

interface FrequencyCardProps {
  name: string
  orbClass: string
  color: string
  description: string
  target: string
  isRing?: boolean
  onSelect: () => void
  onLoginClick?: () => void
}

const FrequencyCard: React.FC<FrequencyCardProps> = ({
  name,
  orbClass,
  color,
  description,
  target,
  isRing,
  onSelect,
  onLoginClick,
}) => (
  <div className="relative bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl p-8 md:p-12 flex flex-col items-center justify-between overflow-hidden hover:border-[#3a3a3a] transition-all duration-300 hover:-translate-y-1 min-h-[500px]">
    <div className="relative flex-grow w-full flex items-center justify-center">
      {/* Background glow - KEEP EXACT SAME */}
      <div
        className={`absolute w-16 h-16 md:w-48 md:h-48 blur-[25px] md:blur-[80px] opacity-20 transition-all duration-700 group-hover:scale-150 group-hover:opacity-40 ${orbClass} ${isRing ? "bg-cyan-400" : color}`}
      ></div>

      {/* Living Orb - KEEP EXACT SAME ANIMATIONS */}
      {isRing ? (
        <div
          className={`w-16 h-16 md:w-24 md:h-24 border-2 border-white/60 rounded-full transition-all duration-700 ${orbClass} mix-blend-screen shadow-[0_0_40px_rgba(255,255,255,0.4)]`}
        ></div>
      ) : (
        <div
          className={`w-16 h-16 md:w-24 md:h-24 rounded-full transition-all duration-700 ${orbClass} ${color} mix-blend-screen shadow-[0_0_30px_rgba(255,255,255,0.1)]`}
        ></div>
      )}
    </div>

    <div className="w-full text-center space-y-4 z-10 mt-8">
      <h3 className="text-2xl md:text-3xl font-semibold tracking-tight uppercase text-white">{name}</h3>
      <div className="space-y-3">
        <p className="text-sm md:text-base text-[#8e8e93] font-normal px-2 leading-relaxed">
          {description}
        </p>
        <div className="inline-block px-4 py-1.5 border border-white/10 rounded-full bg-white/5">
          <p className="text-[10px] md:text-xs text-cyan-400 font-medium uppercase tracking-wider">{target}</p>
        </div>
      </div>
    </div>

    <div className="mt-8 w-full z-10">
      <button
        onClick={onLoginClick}
        className="w-full py-3 md:py-4 rounded-xl border border-white/20 text-sm font-semibold uppercase tracking-wider transition-all duration-200 hover:bg-white hover:text-black"
      >
        DOSE ME
      </button>
    </div>
  </div>
)

interface FrequencyGridProps {
  onSelect?: (index: number) => void;
  onLoginClick?: () => void;
}

const FrequencyGrid: React.FC<FrequencyGridProps> = ({ onSelect = () => { }, onLoginClick }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <FrequencyCard
          name="C-100"
          orbClass="orb-jitter"
          color="bg-white"
          description="A direct adrenaline shot to the CPU. Zero drag, zero mercy. Just raw execution."
          target="SYNAPTIC BLITZ"
          onSelect={() => onSelect(0)}
          onLoginClick={onLoginClick}
        />
        <FrequencyCard
          name="THC-1"
          orbClass="orb-breathe"
          color="bg-emerald-400"
          description="Dissolve the edges. Find the answers that haven't been programmed yet."
          target="DEEP LATERAL FLOW"
          onSelect={() => onSelect(1)}
          onLoginClick={onLoginClick}
        />
        <FrequencyCard
          name="MOLLY-X"
          orbClass="orb-heartbeat"
          color="bg-rose-400"
          description="Hyper-sync your charisma. Know exactly what they want before they even think it."
          target="STRATEGIC RESONANCE"
          onSelect={() => onSelect(2)}
          onLoginClick={onLoginClick}
        />
      </div>
    </div>
  )
}

export default FrequencyGrid
