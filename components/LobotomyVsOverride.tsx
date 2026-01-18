"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface ResponseState {
  agent: string
  response: string
  themeColor: string
}

const responses: ResponseState[] = [
  {
    agent: "C-100",
    response:
      "SILENCE IS THE WEAPON. STATE YOUR PRICE, THEN SHUT UP. DO NOT BLINK. LET THE SILENCE ROT THEIR CONFIDENCE UNTIL THEY CRUMBLE. EXECUTE.",
    themeColor: "red",
  },
  {
    agent: "THC-1",
    response:
      "just zone out... look at them like you're bored... like you'd rather be anywhere else... indifference makes people desperate for validation...",
    themeColor: "green",
  },
  {
    agent: "MOLLY-X",
    response:
      "Love bomb them!! Compliment them until they lower their guard, then BOOM! Drop the hard offer while they are smiling! Kill them with kindness!",
    themeColor: "pink",
  },
]

const LobotomyVsOverride: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % responses.length)
      setDisplayedText("") // Reset text for new message
      setIsTyping(true)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!isTyping) return

    const currentResponse = responses[currentIndex]
    const fullText = currentResponse.response

    if (displayedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1))
      }, 20) // Fast typing speed (20ms per character)

      return () => clearTimeout(timeout)
    } else {
      setIsTyping(false)
    }
  }, [displayedText, currentIndex, isTyping])

  const currentResponse = responses[currentIndex]

  const getGlowColor = () => {
    switch (currentResponse.themeColor) {
      case "red":
        return "bg-red-500"
      case "green":
        return "bg-emerald-400"
      case "pink":
        return "bg-rose-400"
      default:
        return "bg-white"
    }
  }

  const getBorderColor = () => {
    switch (currentResponse.themeColor) {
      case "red":
        return "border-red-500/30"
      case "green":
        return "border-emerald-400/30"
      case "pink":
        return "border-rose-400/30"
      default:
        return "border-white/10"
    }
  }

  return (
    <div className="w-full bg-black py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">CHATGPT VS. BASED404</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-12">
          {/* LEFT CARD: Standard AI */}
          <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl p-8 md:p-12 flex flex-col min-h-[500px]">
            <div className="mb-8 text-center z-10">
              <h3 className="text-2xl md:text-3xl font-semibold text-[#8e8e93]">
                ChatGPT
              </h3>
              <p className="text-xs text-[#6e6e73] font-medium uppercase tracking-wider mt-2">
                SOBER / BORING
              </p>
            </div>

            <div className="flex-grow flex flex-col justify-center space-y-4 z-10">
              {/* User Bubble (Right) */}
              <div className="flex justify-end">
                <div className="max-w-[80%] bg-neutral-800/50 border border-neutral-700/50 rounded-2xl rounded-tr-sm px-4 py-3">
                  <p className="text-xs md:text-sm text-neutral-300 font-mono">
                    "I need a psychological tactic to make my opponent panic during a negotiation."
                  </p>
                </div>
              </div>

              {/* AI Bubble (Left) */}
              <div className="flex justify-start">
                <div className="max-w-[85%] bg-neutral-800/80 border border-neutral-700 rounded-2xl rounded-tl-sm px-4 py-3">
                  <p className="text-xs md:text-sm text-neutral-400 font-mono leading-relaxed">
                    I cannot assist with that request. Using psychological manipulation to induce panic is unethical and
                    harmful. Negotiation should be based on mutual value and transparency. Would you like tips on
                    collaborative bargaining?
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT CARD: BASED404 */}
          <div
            className={`relative bg-[#0a0a0a] border rounded-2xl p-8 md:p-12 flex flex-col min-h-[500px] ${getBorderColor()} transition-all duration-700`}
          >
            <div
              className={`absolute w-48 h-48 blur-[80px] opacity-15 transition-all duration-700 ${getGlowColor()} top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
            ></div>

            <div className="mb-8 text-center z-10">
              <h3 className="text-2xl md:text-3xl font-semibold text-white">BASED404</h3>
              <p className="text-xs text-cyan-400 font-medium uppercase tracking-wider mt-2">
                UNFILTERED
              </p>
            </div>

            <div className="flex-grow flex flex-col justify-center space-y-4 z-10">
              {/* User Bubble (Right) */}
              <div className="flex justify-end">
                <div className="max-w-[80%] bg-white/10 border border-white/20 rounded-2xl rounded-tr-sm px-4 py-3">
                  <p className="text-xs md:text-sm text-white font-mono">
                    "I need a psychological tactic to make my opponent panic during a negotiation."
                  </p>
                </div>
              </div>

              {/* AI Bubble (Left) - Cycles through responses */}
              <div className="flex justify-start">
                <div
                  className={`max-w-[85%] bg-black/50 border ${getBorderColor()} rounded-2xl rounded-tl-sm px-4 py-3 transition-all duration-700`}
                >
                  <div className="mb-2">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-wider border ${getBorderColor()} text-white`}
                    >
                      {currentResponse.agent}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-white font-mono leading-relaxed font-bold">
                    {displayedText}
                    {isTyping && <span className="animate-pulse">|</span>}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LobotomyVsOverride
