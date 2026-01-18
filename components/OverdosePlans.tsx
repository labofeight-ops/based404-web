"use client"

import type React from "react"
import { useState } from "react"
import { Check } from "lucide-react"

interface OverdosePlansProps {
  onLoginClick?: () => void;
}

const OverdosePlans: React.FC<OverdosePlansProps> = ({ onLoginClick }) => {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <div className="w-full bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-se font-semibold tracking-tight mb-6">
            OVERDOSE PLANS
          </h2>

          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium transition-colors ${!isYearly ? "text-white" : "text-[#8e8e93]"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-7 rounded-full bg-[#3a3a3a] border border-[#4a4a4a] transition-all"
            >
              <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white transition-all ${isYearly ? "left-[calc(100%-1.75rem)]" : "left-0.5"}`} />
            </button>
            <span className={`text-sm font-medium transition-colors ${isYearly ? "text-white" : "text-[#8e8e93]"}`}>
              Yearly <span className="text-cyan-400 text-xs">(-25%)</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* FREE CARD */}
          <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl p-8 hover:border-[#3a3a3a] transition-all">
            <h3 className="text-2xl font-semibold mb-3">FREE</h3>
            <p className="text-[#8e8e93] text-sm mb-6">
              10 doses/day. Core states. Test the vibe or level up.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#8e8e93] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-white">Core AI states only</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#8e8e93] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-white">Basic responses</span>
              </div>
            </div>

            <button
              onClick={onLoginClick}
              className="w-full py-3 bg-white/10 border border-white/20 text-white font-medium rounded-xl hover:bg-white/15 transition-all"
            >
              START FREE
            </button>
          </div>

          {/* DOSED CARD */}
          <div className="relative bg-[#0a0a0a] border border-cyan-500/30 rounded-2xl p-8 hover:border-cyan-500/50 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent rounded-2xl pointer-events-none" />

            <div className="relative">
              <h3 className="text-2xl font-semibold mb-2">DOSED</h3>
              <div className="mb-2">
                <span className="text-4xl font-semibold">{isYearly ? "$224.99" : "$29.99"}</span>
                <span className="text-[#8e8e93] text-sm">/{isYearly ? "year" : "month"}</span>
              </div>
              <div className="text-xs text-cyan-400 font-medium mb-4">
                {isYearly ? "Beta: 25% off — Save $75/year" : "Beta: 25% off — $22.49 first month"}
              </div>
              <p className="text-[#8e8e93] text-sm mb-6">
                250 doses/day. Blend states. Schedule the high. Own the day.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white">All 3 agents full power</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white">Hybrid blends unlocked</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white">Ritual scheduling</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white">Heavy daily doses</span>
                </div>
              </div>

              <button
                onClick={onLoginClick}
                className="w-full py-3 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-all"
              >
                DOSE UP
              </button>
            </div>
          </div>

          {/* OVERDOSED CARD */}
          <div className="relative bg-[#0a0a0a] border border-purple-500/30 rounded-2xl p-8 hover:border-purple-500/50 transition-all">
            <div className="absolute top-4 right-4 bg-purple-500/20 border border-purple-500/30 px-3 py-1 rounded-full">
              <span className="text-purple-400 text-xs font-medium uppercase">Popular</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent rounded-2xl pointer-events-none" />

            <div className="relative">
              <h3 className="text-2xl font-semibold mb-2">OVERDOSED</h3>
              <div className="mb-2">
                <span className="text-4xl font-semibold">{isYearly ? "$599.99" : "$79.99"}</span>
                <span className="text-[#8e8e93] text-sm">/{isYearly ? "year" : "month"}</span>
              </div>
              <div className="text-xs text-purple-400 font-medium mb-4">
                {isYearly ? "Beta: 25% off — Save $200/year" : "Beta: 25% off — $59.99 first month"}
              </div>
              <p className="text-[#8e8e93] text-sm mb-6">
                600 doses/day. Elite tier. Scale your edge forever.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white">All Dosed power</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white">Epic dose stack</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white">Early state releases</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white">God mode activated</span>
                </div>
              </div>

              <button
                onClick={onLoginClick}
                className="w-full py-3 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-all"
              >
                INJECT ME
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OverdosePlans
