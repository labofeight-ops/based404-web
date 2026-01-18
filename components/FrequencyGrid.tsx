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
  <div className="glass group relative aspect-square md:aspect-auto md:h-[520px] rounded-[30px] md:rounded-[50px] p-4 md:p-12 flex flex-col items-center justify-between overflow-hidden">
    <div className="relative flex-grow w-full flex items-center justify-center">
      {/* Background glow */}
      <div
        className={`absolute w-16 h-16 md:w-48 md:h-48 blur-[25px] md:blur-[80px] opacity-30 transition-all duration-700 group-hover:scale-150 group-hover:opacity-60 ${orbClass} ${isRing ? "bg-cyan-400" : color}`}
      ></div>

      {/* Living Orb */}
      {isRing ? (
        <div
          className={`w-8 h-8 md:w-24 md:h-24 border-2 border-white/60 rounded-full transition-all duration-700 ${orbClass} mix-blend-screen shadow-[0_0_40px_rgba(255,255,255,0.4)]`}
        ></div>
      ) : (
        <div
          className={`w-8 h-8 md:w-24 md:h-24 rounded-full transition-all duration-700 ${orbClass} ${color} mix-blend-screen shadow-[0_0_30px_rgba(255,255,255,0.1)]`}
        ></div>
      )}
    </div>

    <div className="w-full text-center space-y-4 z-10">
      <h3 className="text-xl md:text-4xl font-black tracking-tighter uppercase italic text-white">{name}</h3>
      <div className="space-y-3">
        <p className="text-[9px] md:text-[13px] text-neutral-400 font-medium uppercase tracking-[2px] leading-relaxed px-2">
          {description}
        </p>
        <div className="inline-block px-4 py-1.5 border border-white/5 rounded-full bg-white/[0.02]">
          <p className="text-[7px] md:text-[10px] text-cyan-300 font-bold uppercase tracking-[4px]">{target}</p>
        </div>
      </div>
    </div>

    <div className="mt-6 md:mt-12 w-full z-10">
      <button
        onClick={onLoginClick}
        className="inline-flex items-center justify-center w-full py-3 md:py-5 rounded-2xl md:rounded-3xl border border-white/10 text-[9px] md:text-[11px] tracking-[5px] font-black uppercase transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0_0_30px_white] active:scale-95 text-center"
      >
        GET STARTED ⚡
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
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
      <div className="mb-16 text-center lg:text-left">

      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
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
