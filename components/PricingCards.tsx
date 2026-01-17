"use client"

import type React from "react"

interface PricingCardProps {
  title: string
  price: string
  features: string[]
  tagline: string
  orbClass: string
  color: string
  highlighted?: boolean
}

const PricingCard: React.FC<PricingCardProps> = ({ title, price, features, tagline, orbClass, color, highlighted }) => (
  <div
    className={`glass group relative aspect-square md:aspect-auto md:h-[620px] rounded-[30px] md:rounded-[50px] p-6 md:p-12 flex flex-col items-center justify-between overflow-hidden ${highlighted ? "border-2 border-cyan-400/50" : ""}`}
  >
    {/* Background glow */}
    <div
      className={`absolute w-24 h-24 md:w-64 md:h-64 blur-[40px] md:blur-[100px] opacity-20 transition-all duration-700 group-hover:scale-150 group-hover:opacity-40 ${orbClass} ${color}`}
    ></div>

    <div className="w-full text-center space-y-6 z-10">
      <div className="space-y-2">
        <h3 className="text-2xl md:text-5xl font-black tracking-tighter uppercase italic text-white">{title}</h3>
        <p className="text-3xl md:text-6xl font-black text-white">{price}</p>
        {price === "Free" && <p className="text-xs md:text-sm text-neutral-500 uppercase tracking-widest">Forever</p>}
      </div>

      <div className="h-px w-20 mx-auto bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      <div className="space-y-3 md:space-y-4 min-h-[200px] md:min-h-[280px]">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start justify-center gap-2 md:gap-3">
            <span className="text-cyan-400 text-sm md:text-base mt-0.5">✓</span>
            <p className="text-xs md:text-base text-neutral-300 font-medium text-left flex-1 max-w-[200px] md:max-w-none">
              {feature}
            </p>
          </div>
        ))}
      </div>

      <div className="pt-4">
        <div className="inline-block px-4 md:px-6 py-2 border border-cyan-400/30 rounded-full bg-cyan-400/5">
          <p className="text-[9px] md:text-xs text-cyan-300 font-bold uppercase tracking-[2px] md:tracking-[4px]">
            {tagline}
          </p>
        </div>
      </div>
    </div>

    <div className="mt-6 md:mt-8 w-full z-10">
      <a
        href="https://t.me/based404official"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full py-4 md:py-6 rounded-2xl md:rounded-3xl border border-white/10 text-xs md:text-sm tracking-[4px] md:tracking-[6px] font-black uppercase transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0_0_40px_white] active:scale-95 text-center"
      >
        DOSE UP
      </a>
    </div>

    {/* Living Orb at bottom */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-0">
      <div
        className={`w-12 h-12 md:w-20 md:h-20 rounded-full transition-all duration-700 ${orbClass} ${color} mix-blend-screen shadow-[0_0_30px_rgba(255,255,255,0.2)] opacity-30 group-hover:opacity-50`}
      ></div>
    </div>
  </div>
)

const PricingCards: React.FC = () => {
  return (
    <div className="w-full bg-black py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-20 text-center">
          <h2 className="text-3xl md:text-6xl font-black italic uppercase text-white mb-4 md:mb-6">
            YOUR AI IS SOBER.
          </h2>
          <p className="text-lg md:text-2xl text-neutral-400 italic">That's the problem.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <PricingCard
            title="SOBER"
            price="Free"
            features={["Unlimited tease", "10 doses/day", "3 core states", "Stay average — or dose up"]}
            tagline="BASELINE MODE"
            orbClass="orb-breathe"
            color="bg-neutral-400"
          />
          <PricingCard
            title="DOSED"
            price="$35/mo"
            features={[
              "Unlimited doses",
              "Overdose blend",
              "Neural echo",
              "Dominance ritual",
              "Unfair advantage injected",
            ]}
            tagline="ENHANCED STATE"
            orbClass="orb-jitter"
            color="bg-cyan-400"
            highlighted={true}
          />
          <PricingCard
            title="OVERDOSED"
            price="$95/mo"
            features={[
              "Everything in Dosed",
              "Shadow dose (proactive)",
              "Rival override",
              "Early new states",
              "God mode activated — dominate",
            ]}
            tagline="TRANSCENDENT MODE"
            orbClass="orb-heartbeat"
            color="bg-rose-400"
          />
        </div>
      </div>
    </div>
  )
}

export default PricingCards
