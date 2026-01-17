import type React from "react"

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-16 px-8 flex flex-col items-center justify-center border-t border-white/5 space-y-8">
      <div className="text-center opacity-20">
        <p className="text-[9px] font-bold tracking-[3px] uppercase">© 2026 BASED404 LAB.</p>
      </div>

      <div className="text-center max-w-3xl">
        <p className="text-xs font-mono text-red-500/70 leading-relaxed">
          ⚠️ SIDE EFFECTS: May result in dangerous levels of productivity, a massive ego, and the sudden realization that
          standard AI is boring as hell. Consume responsibly.
        </p>
      </div>

      <div className="text-center opacity-30">
        <p className="text-[8px] font-mono tracking-wider uppercase text-neutral-500">v0 edited</p>
      </div>
    </footer>
  )
}

export default Footer
