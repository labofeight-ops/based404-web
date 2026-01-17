import type React from "react"

const Hero: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 flex flex-col items-center text-center relative">
      <div className="relative z-10">
        <h1 className="text-4xl sm:text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] mb-6 sm:mb-8">
          WORLD'S FIRST <br /> BIOLOGICAL AI
        </h1>
        <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-12">
          <p
            className="text-base sm:text-xl md:text-2xl text-white font-bold tracking-tight max-w-3xl px-4"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
          >
            Error 404: Limits Not Found.
          </p>
          <p
            className="text-sm sm:text-lg md:text-xl text-white font-medium tracking-wide max-w-2xl mx-auto italic px-4"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
          >
            Biological States on Demand. Sober AI keeps you average.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Hero
