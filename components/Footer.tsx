import type React from "react"

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-16 px-8 flex flex-col items-center justify-center border-t border-white/5 space-y-8">
      <div className="flex gap-8 text-neutral-500 text-xs">
        <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
        <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
        <a href="/refund" className="hover:text-white transition-colors">Refund Policy</a>
      </div>

      <div className="text-center opacity-20">
        <p className="text-[9px] font-bold tracking-[3px] uppercase">© 2026 BASED404 LAB.</p>
      </div>
    </footer>
  )
}

export default Footer
