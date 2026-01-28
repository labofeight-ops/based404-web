"use client"

import { useState } from "react"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import FrequencyGrid from "@/components/FrequencyGrid"
import SystemVisualizer from "@/components/SystemVisualizer"
import OverdosePlans from "@/components/OverdosePlans"
import WaitlistCapture from "@/components/WaitlistCapture"
import Testimonials from "@/components/Testimonials"
import NodeProcessFlow from "@/components/NodeProcessFlow"
import LobotomyVsOverride from "@/components/LobotomyVsOverride"
import Footer from "@/components/Footer"
import { GL } from "@/components/gl"
import TelegramLogin from "@/components/TelegramLogin"
import LoginModal from "@/components/LoginModal"
import HowItWorks from "@/components/HowItWorks"

export default function Page() {
  const [activeProtocolIndex, setActiveProtocolIndex] = useState(0)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const handleProtocolChange = (index: number) => {
    setActiveProtocolIndex(index)
  }

  const openLoginModal = () => setIsLoginModalOpen(true)

  return (
    <div className="flex flex-col w-full min-h-screen relative overflow-x-hidden">
      <Header onLoginClick={openLoginModal} />

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

      <main className="w-full relative z-10">
        <section className="pt-[80px] pb-[40px]">
          <Hero />
        </section>





        <section className="pb-[60px]">
          <FrequencyGrid onSelect={handleProtocolChange} onLoginClick={openLoginModal} />
        </section>

        <section className="bg-black">
          <NodeProcessFlow />
        </section>

        <section className="bg-black">
          <OverdosePlans onLoginClick={openLoginModal} />
        </section>

        <section className="bg-black">
          <WaitlistCapture />
        </section>

        <section className="bg-black">
          <Testimonials />
        </section>

        <section className="pb-[40px] bg-black">
          <SystemVisualizer activeIndex={activeProtocolIndex} onIndexChange={setActiveProtocolIndex} />
        </section>

        <section className="bg-black">
          <LobotomyVsOverride />
        </section>



        <section className="bg-black py-12 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs md:text-sm font-mono text-red-500/70 leading-relaxed">
              SIDE EFFECTS: May result in dangerous levels of productivity, a massive ego, and the sudden realization that standard AI is boring as hell. Consume responsibly.
            </p>
          </div>
        </section>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  )
}
