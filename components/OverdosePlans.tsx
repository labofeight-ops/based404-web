"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"

interface OverdosePlansProps {
  onLoginClick?: () => void;
}

const OverdosePlans: React.FC<OverdosePlansProps> = ({ onLoginClick }) => {
  const [isYearly, setIsYearly] = useState(false)
  const router = useRouter()

  const handlePlanClick = () => {
    // Check if user is logged in
    const sessionToken = typeof window !== 'undefined' ? localStorage.getItem('session_token') : null
    if (sessionToken) {
      // Logged in - go directly to subscription page
      router.push('/dashboard/subscription')
    } else {
      // Not logged in - show login modal
      onLoginClick?.()
    }
  }

  return (
    <div className="w-full bg-black py-16 sm:py-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12"></div>

        <div className="mb-12 sm:mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
            OVERDOSE PLANS
          </h2>

          <div className="flex items-center justify-center gap-4">
            <span
              className={`text-sm sm:text-base font-bold uppercase tracking-wide transition-colors duration-300 ${!isYearly ? "text-white" : "text-neutral-500"
                }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-16 h-8 rounded-full bg-neutral-800 border-2 border-neutral-700 transition-all duration-300 hover:border-cyan-400/50"
            >
              <div
                className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all duration-300 ${isYearly ? "left-[calc(100%-1.75rem)]" : "left-1"
                  }`}
              />
            </button>
            <span
              className={`text-sm sm:text-base font-bold uppercase tracking-wide transition-colors duration-300 ${isYearly ? "text-white" : "text-neutral-500"
                }`}
            >
              Yearly <span className="text-cyan-400 text-xs ml-1">(Save 35%)</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {/* FREE CARD */}
          <div className="glass group relative overflow-hidden rounded-[30px] sm:rounded-[40px] p-6 sm:p-8 transition-all duration-500 hover:scale-105 hover:-translate-y-2 bg-black/80 backdrop-blur-md border border-neutral-700/30">
            <div className="absolute w-32 h-32 sm:w-40 sm:h-40 blur-[60px] sm:blur-[80px] opacity-10 transition-all duration-700 group-hover:scale-125 group-hover:opacity-20 bg-neutral-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

            <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase italic text-white mb-3">
                FREE
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm mb-6 leading-relaxed">
                25 doses/day. Access to all features (except live web search). Access to all 3 agents.
              </p>

              <div className="flex-1 space-y-3 mb-8">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 flex-shrink-0 mt-0.5" />
                  <span className="text-neutral-300 text-xs sm:text-sm">All 3 AI agents (Full Power)</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 flex-shrink-0 mt-0.5" />
                  <span className="text-neutral-300 text-xs sm:text-sm">Hybrid blends unlocked</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 flex-shrink-0 mt-0.5" />
                  <span className="text-neutral-300 text-xs sm:text-sm">Smart reminders + memory</span>
                </div>
              </div>

              <button
                onClick={handlePlanClick}
                className="block w-full py-3 sm:py-4 px-6 bg-neutral-800/50 border border-neutral-700 text-white font-black text-sm sm:text-base uppercase tracking-[2px] rounded-xl transition-all duration-300 hover:bg-neutral-700/50 hover:scale-105 text-center"
              >
                START FREE
              </button>
            </div>
          </div>

          {/* DOSED CARD */}
          <div className="glass group relative overflow-hidden rounded-[30px] sm:rounded-[40px] p-6 sm:p-8 transition-all duration-500 hover:scale-105 hover:-translate-y-2 bg-black/80 backdrop-blur-md border-2 border-cyan-400/50">
            <div className="absolute w-32 h-32 sm:w-40 sm:h-40 blur-[60px] sm:blur-[80px] opacity-20 transition-all duration-700 group-hover:scale-125 group-hover:opacity-40 bg-cyan-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 orb-breathe"></div>

            <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase italic text-white mb-2">
                DOSED
              </h3>
              <div className="mb-2">
                <span className="text-3xl sm:text-4xl font-black text-cyan-400">{isYearly ? "$149" : "$19"}</span>
                <span className="text-neutral-400 text-sm">/{isYearly ? "year" : "mo"}</span>
              </div>
              <div className="mb-4">
                <div className="text-xs text-cyan-400 font-bold mt-1">
                  {isYearly ? "$12/mo billed yearly" : "Cancel ChatGPT. This hits different."}
                </div>
              </div>
              <p className="text-neutral-300 text-xs sm:text-sm mb-6 leading-relaxed">
                250 doses/day. Blend states. Schedule the high. Own the day.
              </p>

              <div className="flex-1 space-y-3 mb-8">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white text-xs sm:text-sm font-medium">All 3 agents full power</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white text-xs sm:text-sm font-medium">Hybrid blends unlocked</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white text-xs sm:text-sm font-medium">Ritual scheduling + delays</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white text-xs sm:text-sm font-medium">Heavy daily doses</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white text-xs sm:text-sm font-medium">Unfiltered edge</span>
                </div>
              </div>

              <div className="block w-full py-3 sm:py-4 px-6 bg-cyan-400/5 border-2 border-cyan-400/20 text-cyan-400/50 font-black text-sm sm:text-base uppercase tracking-[2px] rounded-xl text-center">
                BETA COMING SOON
              </div>
            </div>
          </div>

          {/* OVERDOSED CARD */}
          <div className="glass group relative overflow-hidden rounded-[30px] sm:rounded-[40px] p-6 sm:p-8 transition-all duration-500 hover:scale-105 hover:-translate-y-2 bg-black/80 backdrop-blur-md border-2 border-purple-400/50">
            <div className="absolute w-32 h-32 sm:w-40 sm:h-40 blur-[60px] sm:blur-[80px] opacity-20 transition-all duration-700 group-hover:scale-125 group-hover:opacity-40 bg-purple-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 orb-heartbeat"></div>

            <div className="absolute top-4 right-4 bg-purple-400/20 border border-purple-400/50 px-3 py-1 rounded-full">
              <span className="text-purple-400 text-[10px] font-bold uppercase tracking-wider">POPULAR</span>
            </div>

            <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase italic text-white mb-2">
                OVERDOSED
              </h3>
              <div className="mb-2">
                <span className="text-3xl sm:text-4xl font-black text-purple-400">
                  {isYearly ? "$299" : "$39"}
                </span>
                <span className="text-neutral-400 text-sm">/{isYearly ? "year" : "mo"}</span>
              </div>
              <div className="mb-4">
                <div className="text-xs text-purple-400 font-bold mt-1">
                  {isYearly ? "$25/mo billed yearly" : "Power users only. Maximum capacity."}
                </div>
              </div>
              <p className="text-neutral-300 text-xs sm:text-sm mb-6 leading-relaxed">
                600 doses/day. Elite tier. Scale your edge forever.
              </p>

              <div className="flex-1 space-y-3 mb-8">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white text-xs sm:text-sm font-medium">All Dosed power</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white text-xs sm:text-sm font-medium">Epic dose stack</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white text-xs sm:text-sm font-medium">Early state releases</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white text-xs sm:text-sm font-medium">God mode activated</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white text-xs sm:text-sm font-medium">Ultimate dominance</span>
                </div>
              </div>

              <div className="block w-full py-3 sm:py-4 px-6 bg-purple-400/5 border-2 border-purple-400/20 text-purple-400/50 font-black text-sm sm:text-base uppercase tracking-[2px] rounded-xl text-center">
                BETA COMING SOON
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OverdosePlans
