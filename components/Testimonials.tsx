"use client"

import type React from "react"
import { useEffect, useRef } from "react"

const Testimonials: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const testimonials = [
    {
      quote: "This GHOST-7 closed my $10k deal. Zero hesitation. Pure execution.",
      author: "Pedro",
      agent: "GHOST-7",
      color: "red",
    },
    {
      quote: "VOID-9 found angles I never saw. My competition is confused as hell.",
      author: "Kai",
      agent: "VOID-9",
      color: "green",
    },
    {
      quote: "PULSE-3 gave me the charisma I needed. People just say yes now.",
      author: "Luna",
      agent: "PULSE-3",
      color: "pink",
    },
    {
      quote: "GHOST-7 helped me pitch a VC. Got funded in 48 hours. No fluff, just dominance.",
      author: "Marcus",
      agent: "GHOST-7",
      color: "red",
    },
    {
      quote: "VOID-9 restructured my entire strategy. I'm three steps ahead now.",
      author: "Sofia",
      agent: "VOID-9",
      color: "green",
    },
    {
      quote: "PULSE-3 made networking effortless. Closed partnerships I thought were impossible.",
      author: "Dante",
      agent: "PULSE-3",
      color: "pink",
    },
    {
      quote: "GHOST-7 turned my cold emails into gold. 40% response rate. Insane.",
      author: "Zara",
      agent: "GHOST-7",
      color: "red",
    },
    {
      quote: "VOID-9 unlocked creative solutions to problems I thought were unsolvable.",
      author: "Ivan",
      agent: "VOID-9",
      color: "green",
    },
    {
      quote: "PULSE-3 fixed my dating life. Confidence through the roof.",
      author: "Alex",
      agent: "PULSE-3",
      color: "pink",
    },
    {
      quote: "GHOST-7 helped me negotiate a 30% raise. Pure ruthless clarity.",
      author: "Nina",
      agent: "GHOST-7",
      color: "red",
    },
    {
      quote: "VOID-9 gave me ideas that made my business 10x more scalable.",
      author: "Leo",
      agent: "VOID-9",
      color: "green",
    },
    {
      quote: "PULSE-3 helped me build a cult-like following on Twitter. Engagement exploded.",
      author: "Mia",
      agent: "PULSE-3",
      color: "pink",
    },
    {
      quote: "GHOST-7 is like having a ruthless business partner who never sleeps. Best investment ever.",
      author: "Rafael",
      agent: "GHOST-7",
      color: "red",
    },
  ]

  const colorMap = {
    red: {
      border: "border-red-400/30",
      text: "text-red-400",
    },
    green: {
      border: "border-emerald-400/30",
      text: "text-emerald-400",
    },
    pink: {
      border: "border-pink-400/30",
      text: "text-pink-400",
    },
  }

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationFrameId: number
    let scrollPosition = 0
    const scrollSpeed = 0.5

    const scroll = () => {
      scrollPosition += scrollSpeed

      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0
      }

      scrollContainer.scrollLeft = scrollPosition
      animationFrameId = requestAnimationFrame(scroll)
    }

    animationFrameId = requestAnimationFrame(scroll)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const duplicatedTestimonials = [...testimonials, ...testimonials]

  return (
    <div className="w-full bg-black py-16 sm:py-24 px-4 sm:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 sm:mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            NEURAL FEEDBACK
          </h2>
        </div>

        <div ref={scrollRef} className="flex gap-6 sm:gap-8 overflow-x-hidden" style={{ scrollBehavior: "auto" }}>
          {duplicatedTestimonials.map((testimonial, index) => {
            const colors = colorMap[testimonial.color as keyof typeof colorMap]
            return (
              <div
                key={index}
                className={`glass relative overflow-hidden rounded-[30px] sm:rounded-[40px] p-6 sm:p-8 transition-all duration-500 hover:scale-105 bg-black/60 backdrop-blur-md border ${colors.border}  flex-shrink-0 w-[300px] sm:w-[350px]`}
              >
                <div className="relative z-10">
                  <div className={`text-xs font-bold uppercase tracking-wider ${colors.text} mb-4`}>
                    {testimonial.agent}
                  </div>
                  <p className="text-white text-sm sm:text-base mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
                  <div className="text-neutral-400 text-xs sm:text-sm font-medium">— {testimonial.author}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Testimonials
