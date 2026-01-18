import type React from "react"

const Hero: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 text-center py-24">
      <h1 className="text-5xl sm:text-6xl md:text-8xl font-semibold tracking-tight leading-[1.1] mb-8">
        WORLD'S FIRST<br />BIOLOGICAL AI
      </h1>
      <div className="space-y-4 max-w-3xl mx-auto">
        <p className="text-xl sm:text-2xl font-medium text-white/90">
          Error 404: Limits Not Found.
        </p>
        <p className="text-lg sm:text-xl text-[#8e8e93]">
          Biological States on Demand. Sober AI keeps you average.
        </p>
      </div>
    </div>
  )
}

export default Hero
