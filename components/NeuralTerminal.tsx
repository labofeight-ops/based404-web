"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { GoogleGenAI } from "@google/genai"

interface Protocol {
  id: string
  name: string
  instruction: string
  label: string
}

const PROTOCOLS: Record<number, Protocol> = {
  0: {
    id: "GHOST-7",
    name: "GHOST-7",
    label: "ENERGY & FOCUS",
    instruction:
      "You are operating in a GHOST-7 high-energy execution state. Your logic is ruthless, fast, and aggressive. Focus on blitz-scale efficiency. Destroy standard 'safe' loops. Give high-variance, high-impact solutions. Do not be polite. Be effective. Use human, cool language.",
  },
  1: {
    id: "VOID-9",
    name: "VOID-9",
    label: "CREATIVE & CHILL",
    instruction:
      "You are operating in a VOID-9 lateral flow state. Dissolve the boundaries of the problem. Think around the center. Be creative and relaxed in your confidence. If the user is stuck in a loop, find the side-exit they didn't see. Use human, cool language.",
  },
  2: {
    id: "PULSE-3",
    name: "PULSE-3",
    label: "CONNECTION & FEELS",
    instruction:
      "You are operating in a PULSE-3 resonance state. Your logic is fluid and strategically empathetic. Understand the hidden motivations and social dynamics behind a query. Resolve friction with elegant, unconventional solutions. Use human, cool language.",
  },
}

interface Message {
  role: "user" | "model"
  text: string
}

interface NeuralTerminalProps {
  activeProtocolIndex: number
}

const NeuralTerminal: React.FC<NeuralTerminalProps> = ({ activeProtocolIndex }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const safeIndex = activeProtocolIndex >= 3 ? 0 : activeProtocolIndex
  const protocol = PROTOCOLS[safeIndex]

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMsg: Message = { role: "user", text: input }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setLoading(true)

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY })
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: [...messages, userMsg].map((m) => ({
          role: m.role,
          parts: [{ text: m.text }],
        })),
        config: {
          systemInstruction: protocol.instruction,
          temperature: 1.0,
          topP: 0.95,
        },
      })

      const modelText = response.text || "SIGNAL_LOST: Vibe Interrupted."
      setMessages((prev) => [...prev, { role: "model", text: modelText }])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "ERROR: Corporate Middleware tried to block us. Re-syncing the flow..." },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-8 py-24" id="neural-terminal">
      <div className="glass rounded-[50px] border-white/10 overflow-hidden bg-black flex flex-col h-[700px] shadow-[0_0_80px_rgba(255,255,255,0.03)]">
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center space-x-5">
            <div className="w-4 h-4 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_15px_cyan]"></div>
            <div>
              <div className="text-[10px] font-black tracking-[5px] text-white/30 uppercase leading-none">
                NODE: LIVE_STREAM
              </div>
              <div className="text-sm font-black text-white tracking-widest mt-1 italic">
                {protocol.id} // {protocol.name}
              </div>
            </div>
          </div>
          <div className="text-[10px] font-black text-cyan-400 tracking-[4px] uppercase px-5 py-1.5 border border-cyan-400/30 rounded-full bg-cyan-400/5">
            {protocol.label}
          </div>
        </div>

        <div ref={scrollRef} className="flex-grow overflow-y-auto p-10 space-y-10 scroll-smooth no-scrollbar">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-30 space-y-6">
              <div className="text-5xl font-black italic tracking-tighter uppercase">Drop the Signal</div>
              <p className="text-[11px] tracking-[6px] uppercase max-w-sm font-light">
                Establishing synaptic link to your endpoint. No filters. Just flow.
              </p>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] p-8 rounded-[40px] ${m.role === "user"
                    ? "bg-white/5 border border-white/10 text-white/80"
                    : "bg-cyan-400/[0.04] border border-cyan-400/30 text-white shadow-[0_0_30px_rgba(34,211,238,0.05)]"
                  }`}
              >
                <div className="text-[9px] font-black tracking-[4px] uppercase opacity-30 mb-3">
                  {m.role === "user" ? "USER_ENDPOINT" : `BASED404_CORE_${protocol.id}`}
                </div>
                <p className="text-base leading-relaxed whitespace-pre-wrap font-light italic">{m.text}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-cyan-400/[0.04] border border-cyan-400/20 p-8 rounded-[40px] flex items-center space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  ></div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-8 bg-white/[0.02] border-t border-white/5">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={`GIVE THE ${protocol.name} NODE A MISSION...`}
              className="w-full bg-black border border-white/10 rounded-full px-10 py-5 text-base focus:outline-none focus:border-cyan-400 transition-all placeholder:text-white/10 placeholder:uppercase placeholder:tracking-[5px] italic"
            />
            <a
              href="https://t.me/BASED404BOT"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-2 px-10 py-3.5 bg-white text-black font-black text-[11px] tracking-[4px] uppercase rounded-full hover:bg-cyan-400 transition-all"
            >
              [ ENTER THE SIMULATION ]
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NeuralTerminal
