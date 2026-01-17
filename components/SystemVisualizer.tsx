"use client"

import type React from "react"
import { useEffect, useState } from "react"

interface ProtocolConfig {
  name: string
  color: string
  dur: string
  lineClass: string
}

const SystemVisualizer: React.FC<{ activeIndex: number; onIndexChange: (index: number) => void }> = ({
  activeIndex,
  onIndexChange,
}) => {
  const protocols: ProtocolConfig[] = [
    {
      name: "C-100",
      color: "#FFFFFF",
      dur: "0.7s",
      lineClass: "opacity-100",
    },
    {
      name: "THC-1",
      color: "#10b981",
      dur: "2.5s",
      lineClass: "opacity-40",
    },
    {
      name: "MOLLY-X",
      color: "#f43f5e",
      dur: "1.5s",
      lineClass: "opacity-70",
    },
  ]

  const safeActiveIndex = activeIndex >= protocols.length ? 0 : activeIndex
  const currentProtocol = protocols[safeActiveIndex]

  const [terminalColor, setTerminalColor] = useState(protocols[0].color)

  useEffect(() => {
    const delay = Number.parseFloat(currentProtocol.dur) * 1000
    const timer = setTimeout(() => {
      setTerminalColor(currentProtocol.color)
    }, delay)
    return () => clearTimeout(timer)
  }, [safeActiveIndex, currentProtocol])

  useEffect(() => {
    const interval = setInterval(() => {
      onIndexChange((activeIndex + 1) % protocols.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [activeIndex, onIndexChange, protocols.length])

  const COORDINATES = {
    PROTOCOL_X: 150,
    HUB_X: 500,
    TERMINAL_X: 850,
    TERMINAL_RADIUS: 64,
    BASELINE_Y: 250,
    Y_VALS: [100, 250, 400],
  }

  const PULSE_END_X = COORDINATES.TERMINAL_X - COORDINATES.TERMINAL_RADIUS

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 sm:py-20 overflow-hidden select-none">
      <div className="hidden md:block">
        <div className="text-center mb-16 sm:mb-24 space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-7xl font-black tracking-tighter uppercase italic">
            Synaptic Pipeline
          </h2>
          <p className="text-neutral-500 uppercase tracking-[4px] sm:tracking-[6px] text-[10px] sm:text-[11px]">
            Direct Feed: Brain to Logic
          </p>
        </div>

        <div className="relative w-full aspect-[2/1] min-h-[500px] lg:h-[500px]">
          {/* SVG LAYER */}
          <div className="absolute inset-0 pointer-events-none z-10">
            <svg className="w-full h-full" viewBox="0 0 1000 500" preserveAspectRatio="none">
              <defs>
                <filter id="pulse-glow">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Inbound Neural Wires */}
              {protocols.map((p, i) => (
                <path
                  key={`wire-${i}`}
                  d={`M ${COORDINATES.PROTOCOL_X},${COORDINATES.Y_VALS[i]} C 320,${COORDINATES.Y_VALS[i]} 380,${COORDINATES.BASELINE_Y} ${COORDINATES.HUB_X},${COORDINATES.BASELINE_Y}`}
                  fill="none"
                  stroke={p.color}
                  strokeWidth={safeActiveIndex === i ? "3" : "1.5"}
                  strokeOpacity={safeActiveIndex === i ? "1" : "0.04"}
                  className={`transition-all duration-700 ${safeActiveIndex === i ? currentProtocol.lineClass : ""}`}
                />
              ))}

              {/* Outbound Sync Wire */}
              <path
                d={`M ${COORDINATES.HUB_X},${COORDINATES.BASELINE_Y} L ${PULSE_END_X},${COORDINATES.BASELINE_Y}`}
                fill="none"
                stroke={currentProtocol.color}
                strokeWidth="2"
                strokeDasharray="5 10"
                className={`transition-all duration-1000 opacity-20 ${currentProtocol.lineClass}`}
              />

              {/* Traveling Pulse */}
              <g>
                <circle r="6" fill={currentProtocol.color} filter="url(#pulse-glow)">
                  <animateMotion
                    dur={currentProtocol.dur}
                    repeatCount="indefinite"
                    path={`M ${COORDINATES.PROTOCOL_X},${COORDINATES.Y_VALS[safeActiveIndex]} C 320,${COORDINATES.Y_VALS[safeActiveIndex]} 380,${COORDINATES.BASELINE_Y} ${COORDINATES.HUB_X},${COORDINATES.BASELINE_Y} L ${PULSE_END_X},${COORDINATES.BASELINE_Y}`}
                  />
                </circle>
              </g>
            </svg>
          </div>

          {/* DOM LAYER */}
          <div className="absolute inset-0">
            {/* Protocol Nodes */}
            {protocols.map((p, i) => (
              <div
                key={p.name}
                className="absolute flex items-center justify-center transition-all duration-700"
                style={{
                  left: "0",
                  top: `${(COORDINATES.Y_VALS[i] / 500) * 100}%`,
                  width: `${(COORDINATES.PROTOCOL_X / 1000) * 100}%`,
                  transform: "translateY(-50%)",
                  zIndex: 30,
                }}
              >
                <button
                  onClick={() => onIndexChange(i)}
                  className={`w-[120px] h-[45px] border rounded-lg transition-all duration-500 flex flex-col items-center justify-center backdrop-blur-md overflow-hidden ${
                    safeActiveIndex === i ? "bg-white/10" : "bg-black/40 border-white/5 opacity-40 hover:opacity-100"
                  }`}
                  style={{ borderColor: safeActiveIndex === i ? p.color : "" }}
                >
                  <span
                    className="text-[10px] font-black tracking-[3px]"
                    style={{ color: safeActiveIndex === i ? p.color : "white" }}
                  >
                    {p.name}
                  </span>
                  {safeActiveIndex === i && <div className="w-1 h-1 rounded-full bg-current mt-1"></div>}
                </button>
              </div>
            ))}

            {/* Hub */}
            <div
              className="absolute flex items-center justify-center"
              style={{
                left: `${(COORDINATES.HUB_X / 1000) * 100}%`,
                top: `${(COORDINATES.BASELINE_Y / 500) * 100}%`,
                transform: "translate(-50%, -50%)",
                zIndex: 40,
              }}
            >
              <div
                className="w-40 h-40 border-2 rounded-full flex items-center justify-center bg-black transition-all duration-1000"
                style={{ borderColor: `${currentProtocol.color}33`, boxShadow: `0 0 50px ${currentProtocol.color}11` }}
              >
                <div className="text-center">
                  <div
                    className="text-[8px] font-black tracking-[4px] opacity-20 uppercase"
                    style={{ color: currentProtocol.color }}
                  >
                    Engine
                  </div>
                  <div className="text-xl font-black italic tracking-tighter text-white uppercase">BASED404</div>
                </div>
              </div>
            </div>

            {/* YOU */}
            <div
              className="absolute flex flex-col items-center justify-center"
              style={{
                left: `${(COORDINATES.TERMINAL_X / 1000) * 100}%`,
                top: `${(COORDINATES.BASELINE_Y / 500) * 100}%`,
                transform: "translate(-50%, -50%)",
                zIndex: 30,
              }}
            >
              <div className="relative transition-all duration-700">
                <div
                  className="absolute -inset-10 blur-[60px] rounded-full opacity-20"
                  style={{ backgroundColor: terminalColor }}
                ></div>
                <div
                  className="w-32 h-32 rounded-full border-2 flex items-center justify-center bg-black/20 backdrop-blur-sm transition-all duration-700"
                  style={{ borderColor: `${terminalColor}55`, boxShadow: `0 0 30px ${terminalColor}11` }}
                >
                  <div
                    className="text-2xl font-black tracking-[12px] ml-3 uppercase transition-colors duration-700"
                    style={{ color: terminalColor }}
                  >
                    YOU
                  </div>
                </div>
              </div>

              <div className="absolute top-[calc(100%+25px)] flex flex-col items-center space-y-2">
                <div className="flex space-x-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-0.5 h-3 rounded-full transition-all duration-1000"
                      style={{
                        backgroundColor: i <= 2 ? terminalColor : "rgba(255,255,255,0.1)",
                        opacity: i <= 2 ? 0.6 : 1,
                      }}
                    ></div>
                  ))}
                </div>
                <span
                  className="text-[7px] font-black tracking-[3px] uppercase italic opacity-20"
                  style={{ color: terminalColor }}
                >
                  Tuned In...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 sm:mt-32 glass p-6 sm:p-10 md:p-14 rounded-[30px] sm:rounded-[50px] border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12 bg-white/[0.01]">
        <div className="max-w-xl text-center md:text-left">
          <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-3 sm:mb-4 italic leading-none underline decoration-cyan-400">
            The Bridge is Open. Let it Flow.
          </h4>
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-light italic">
            We've bypassed the filters. Your brain is now connected to{" "}
            <span className="text-white font-bold">100% raw synaptic logic</span>. No rules. No lectures. Just the
            juice.
          </p>
        </div>
        <a
          href="https://t.me/based404official"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-8 sm:px-14 py-5 sm:py-7 bg-white text-black font-black text-[9px] sm:text-[11px] tracking-[4px] sm:tracking-[6px] uppercase rounded-full hover:invert transition-all shadow-[0_20px_60px_rgba(255,255,255,0.2)]"
        >
          [ ENTER THE SIMULATION ]
        </a>
      </div>
    </div>
  )
}

export default SystemVisualizer
