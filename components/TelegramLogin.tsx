"use client"

import type React from "react"
import { useEffect } from "react"

const TelegramLogin: React.FC = () => {
  useEffect(() => {
    // Load Telegram Login Widget script
    const script = document.createElement("script")
    script.src = "https://telegram.org/js/telegram-widget.js?22"
    script.setAttribute("data-telegram-login", "BASED404BOT")
    script.setAttribute("data-size", "large")
    script.setAttribute("data-radius", "10")
    script.setAttribute("data-auth-url", "https://based404.com/auth/telegram")
    script.setAttribute("data-request-access", "write")
    script.async = true

    const container = document.getElementById("telegram-login-container")
    if (container) {
      container.innerHTML = ""
      container.appendChild(script)
    }
  }, [])

  return (
    <div className="w-full bg-black py-16 sm:py-24 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="glass relative rounded-[30px] sm:rounded-[50px] p-8 sm:p-16 overflow-hidden border border-cyan-500/30">
          {/* Background glow */}
          <div className="absolute w-64 h-64 bg-cyan-500 blur-[120px] opacity-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>

          <div className="relative z-10 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white animate-pulse">
              Connect to Unlock
            </h2>
            <p className="text-base sm:text-lg text-cyan-300 font-medium max-w-xl mx-auto">
              Login with Telegram to access your profile, upgrade your plan, and track your doses.
            </p>

            {/* Telegram Login Widget Container */}
            <div id="telegram-login-container" className="flex justify-center items-center min-h-[60px] mt-8"></div>

            <p className="text-xs sm:text-sm text-neutral-500 font-mono mt-4">
              Connect your Telegram account to unlock biological override states
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TelegramLogin
