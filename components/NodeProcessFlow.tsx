"use client"

import type React from "react"
import { Send, CreditCard, Zap } from "lucide-react"

const NodeProcessFlow: React.FC = () => {
  return (
    <div className="w-full bg-black py-16 sm:py-24 px-4 sm:px-8 overflow-visible">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 sm:mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            HOW IT WORKS
          </h2>
        </div>

        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-0 lg:justify-between max-w-6xl mx-auto overflow-visible">
          {/* Node 1: Connect */}
          <div className="relative z-20 flex flex-col items-center text-center group">
            <div className="glass w-44 h-44 sm:w-52 sm:h-52 rounded-[30px] sm:rounded-[40px] flex flex-col items-center justify-center p-4 sm:p-6 transition-all duration-500 hover:scale-105 bg-black/80 backdrop-blur-md">
              <div className="absolute w-24 sm:w-32 h-24 sm:h-32 blur-[50px] sm:blur-[60px] opacity-20 transition-all duration-700 group-hover:scale-125 group-hover:opacity-40 bg-cyan-400"></div>

              <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-full bg-cyan-400/10 border border-cyan-400/30 relative z-10">
                <Send className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
              </div>

              <h3 className="text-xl sm:text-2xl font-black tracking-tighter uppercase italic text-white mb-2 relative z-10">
                CONNECT
              </h3>
              <p className="text-[10px] sm:text-[11px] text-neutral-400 font-medium uppercase tracking-[1.5px] leading-relaxed relative z-10">
                Link via Telegram. Instant entry.
              </p>
            </div>
          </div>

          {/* Vertical connector for mobile */}
          <div className="lg:hidden w-0.5 h-8 relative z-10">
            <div className="relative w-full h-full bg-gradient-to-b from-cyan-500/20 via-cyan-500/40 to-purple-500/20">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400 to-transparent status-pulse"></div>
              <div className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-[travel-vertical_3s_ease-in-out_infinite]"></div>
            </div>
          </div>

          {/* Connecting line 1 - Desktop only */}
          <div className="hidden lg:block absolute left-[calc(25%-2rem)] top-[6.5rem] w-[calc(25%+4rem)] h-0.5 z-10">
            <div className="relative w-full h-full bg-gradient-to-r from-cyan-500/20 via-cyan-500/40 to-purple-500/20 mx-[-52px]">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent status-pulse mx-[57px]"></div>
              <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-[travel_3s_ease-in-out_infinite]"></div>
            </div>
          </div>

          {/* Node 2: Subscribe */}
          <div className="relative z-20 flex flex-col items-center text-center group">
            <div className="glass w-44 h-44 sm:w-52 sm:h-52 rounded-[30px] sm:rounded-[40px] flex flex-col items-center justify-center p-4 sm:p-6 transition-all duration-500 hover:scale-105 bg-black/80 backdrop-blur-md">
              <div className="absolute w-24 sm:w-32 h-24 sm:h-32 blur-[50px] sm:blur-[60px] opacity-20 transition-all duration-700 group-hover:scale-125 group-hover:opacity-40 bg-purple-400"></div>

              <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-full bg-purple-400/10 border border-purple-400/30 orb-breathe relative z-10">
                <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
              </div>

              <h3 className="text-xl sm:text-2xl font-black tracking-tighter uppercase italic text-white mb-2 relative z-10">
                SUBSCRIBE
              </h3>
              <p className="text-[10px] sm:text-[11px] text-neutral-400 font-medium uppercase tracking-[1.5px] leading-relaxed relative z-10">
                Select your Plan. Unlock the Squad.
              </p>
            </div>
          </div>

          {/* Vertical connector for mobile */}
          <div className="lg:hidden w-0.5 h-8 relative z-10">
            <div className="relative w-full h-full bg-gradient-to-b from-purple-500/20 via-purple-500/40 to-green-500/20">
              <div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400 to-transparent status-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_15px_rgba(192,132,252,0.8)] animate-[travel-vertical_3s_ease-in-out_infinite_1s]"></div>
            </div>
          </div>

          {/* Connecting line 2 - Desktop only */}
          <div className="hidden lg:block absolute left-[calc(50%+2rem)] top-[6.5rem] w-[calc(25%+4rem)] h-0.5 z-10">
            <div className="relative w-full h-full bg-gradient-to-r from-purple-500/20 via-purple-500/40 to-green-500/20">
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent status-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_20px_rgba(192,132,252,0.8)] animate-[travel_3s_ease-in-out_infinite_1s]"></div>
            </div>
          </div>

          {/* Node 3: Override */}
          <div className="relative z-20 flex flex-col items-center text-center group">
            <div className="glass w-44 h-44 sm:w-52 sm:h-52 rounded-[30px] sm:rounded-[40px] flex flex-col items-center justify-center p-4 sm:p-6 transition-all duration-500 hover:scale-105 bg-black/80 backdrop-blur-md">
              <div className="absolute w-24 sm:w-32 h-24 sm:h-32 blur-[50px] sm:blur-[60px] opacity-20 transition-all duration-700 group-hover:scale-125 group-hover:opacity-40 bg-emerald-400"></div>

              <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-full bg-emerald-400/10 border border-emerald-400/30 orb-heartbeat relative z-10">
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400" />
              </div>

              <h3 className="text-xl sm:text-2xl font-black tracking-tighter uppercase italic text-white mb-2 relative z-10">
                OVERRIDE
              </h3>
              <p className="text-[10px] sm:text-[11px] text-neutral-400 font-medium uppercase tracking-[1.5px] leading-relaxed relative z-10">
                Select Agent. Command the System.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NodeProcessFlow
