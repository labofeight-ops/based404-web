"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { GL } from "@/components/gl"

// Mock user data - replace with actual auth logic
const mockUser = {
  isLoggedIn: false, // Set to true to test logged-in state
  username: "shadow_trader",
  plan: "DOSED",
  creditsLeft: 247,
  currentState: "THC-1 Active",
  doseHistory: [
    { agent: "C-100", timestamp: "2026-01-06 14:23" },
    { agent: "THC-1", timestamp: "2026-01-06 09:15" },
    { agent: "MOLLY-X", timestamp: "2026-01-05 22:47" },
    { agent: "C-100", timestamp: "2026-01-05 16:32" },
    { agent: "THC-1", timestamp: "2026-01-04 11:09" },
  ],
}

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser)

  useEffect(() => {
    // Load Telegram Login Widget script if not logged in
    if (!user.isLoggedIn) {
      const script = document.createElement("script")
      script.src = "https://telegram.org/js/telegram-widget.js?22"
      script.setAttribute("data-telegram-login", "based404official")
      script.setAttribute("data-size", "large")
      script.setAttribute("data-radius", "10")
      script.setAttribute("data-auth-url", "https://based404.com/auth/telegram")
      script.setAttribute("data-request-access", "write")
      script.async = true

      const container = document.getElementById("telegram-login-fullscreen")
      if (container) {
        container.innerHTML = ""
        container.appendChild(script)
      }
    }
  }, [user.isLoggedIn])

  const getPlanColor = () => {
    switch (user.plan) {
      case "Free":
        return "text-neutral-400 border-neutral-600/30"
      case "DOSED":
        return "text-cyan-400 border-cyan-500/30"
      case "OVERDOSED":
        return "text-purple-400 border-purple-500/30"
      default:
        return "text-white border-white/10"
    }
  }

  if (!user.isLoggedIn) {
    return (
      <div className="flex flex-col w-full min-h-screen relative bg-black">
        <Header />

        <div className="fixed inset-0 z-0">
          <GL />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.85) 85%, black 100%)",
            }}
          />
        </div>

        <main className="w-full relative z-10 flex-grow flex items-center justify-center py-24 px-4">
          <div className="glass relative rounded-[30px] sm:rounded-[50px] p-12 sm:p-20 overflow-hidden border border-cyan-500/30 max-w-2xl w-full">
            <div className="absolute w-96 h-96 bg-cyan-500 blur-[150px] opacity-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>

            <div className="relative z-10 text-center space-y-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
                Your BASED404 Profile
              </h1>
              <p className="text-lg sm:text-xl text-cyan-300 font-medium">
                Connect to view your profile and manage your biological overrides.
              </p>

              <div id="telegram-login-fullscreen" className="flex justify-center items-center min-h-[60px] mt-12"></div>

              <Link
                href="/"
                className="inline-block mt-8 text-sm text-neutral-400 hover:text-white transition-colors underline"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full min-h-screen relative bg-black">
      <Header />

      <div className="fixed inset-0 z-0">
        <GL />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.85) 85%, black 100%)",
          }}
        />
      </div>

      <main className="w-full relative z-10 flex-grow py-24 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-4 animate-pulse">
              Your BASED404 Profile
            </h1>
            <p className="text-lg text-cyan-300 font-medium">@{user.username}</p>
          </div>

          {/* Subscription Plan Card */}
          <div className="glass relative rounded-[30px] p-8 border border-white/10 overflow-hidden">
            <div className="absolute w-48 h-48 bg-cyan-500 blur-[100px] opacity-10 top-0 right-0"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-black uppercase mb-4 text-white">Subscription Plan</h2>
              <div
                className={`inline-block px-6 py-3 rounded-full border-2 ${getPlanColor()} text-2xl font-black uppercase`}
              >
                {user.plan}
              </div>
              {user.plan === "DOSED" && (
                <p className="text-sm text-cyan-400 mt-2 font-mono">$25/month • Lifetime Lock</p>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Credits */}
            <div className="glass relative rounded-[30px] p-8 border border-white/10 overflow-hidden">
              <div className="absolute w-32 h-32 bg-emerald-500 blur-[80px] opacity-10 bottom-0 left-0"></div>
              <div className="relative z-10">
                <h3 className="text-lg font-bold uppercase mb-2 text-neutral-400">Credits Left</h3>
                <p className="text-5xl font-black text-emerald-400">{user.creditsLeft}</p>
              </div>
            </div>

            {/* Current State */}
            <div className="glass relative rounded-[30px] p-8 border border-white/10 overflow-hidden">
              <div className="absolute w-32 h-32 bg-purple-500 blur-[80px] opacity-10 bottom-0 right-0"></div>
              <div className="relative z-10">
                <h3 className="text-lg font-bold uppercase mb-2 text-neutral-400">Current State</h3>
                <p className="text-2xl font-black text-purple-400">{user.currentState}</p>
              </div>
            </div>
          </div>

          {/* Dose History */}
          <div className="glass relative rounded-[30px] p-8 border border-white/10 overflow-hidden">
            <div className="absolute w-64 h-64 bg-red-500 blur-[120px] opacity-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-black uppercase mb-6 text-white">Recent Doses</h2>
              <div className="space-y-3">
                {user.doseHistory.map((dose, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 rounded-xl bg-black/30 border border-white/5 hover:border-white/20 transition-colors"
                  >
                    <span className="text-lg font-black text-white">{dose.agent}</span>
                    <span className="text-sm text-neutral-500 font-mono">{dose.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <a
              href="https://t.me/BASED404BOT"
              target="_blank"
              rel="noopener noreferrer"
              className="glass px-8 py-4 rounded-full border border-cyan-500/30 text-cyan-400 font-black uppercase tracking-wide hover:border-cyan-400 hover:bg-cyan-500/10 transition-all"
            >
              Upgrade Plan
            </a>
            <button
              onClick={() => setUser({ ...user, isLoggedIn: false })}
              className="glass px-8 py-4 rounded-full border border-red-500/30 text-red-400 font-black uppercase tracking-wide hover:border-red-400 hover:bg-red-500/10 transition-all"
            >
              Logout
            </button>
            <Link
              href="/"
              className="glass px-8 py-4 rounded-full border border-white/10 text-white font-black uppercase tracking-wide hover:border-white/30 hover:bg-white/5 transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
