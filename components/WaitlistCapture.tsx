"use client"

import type React from "react"
import { useState } from "react"

const WaitlistCapture: React.FC = () => {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder for actual submission logic
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="w-full bg-black py-16 sm:py-20 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
          Join the waitlist for lifetime lock
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 px-6 py-4 bg-black/50 border-2 border-cyan-400/30 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 transition-all duration-300"
          />
          <button
            type="submit"
            disabled={submitted}
            className="px-8 py-4 bg-cyan-400/20 border-2 border-cyan-400 text-cyan-400 font-black text-sm sm:text-base uppercase tracking-[2px] rounded-xl transition-all duration-300 hover:bg-cyan-400 hover:text-black hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitted ? "INJECTED ✓" : "INJECT ME"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default WaitlistCapture
