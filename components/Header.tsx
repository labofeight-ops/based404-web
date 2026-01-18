import type React from "react"

interface HeaderProps {
  onLoginClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  return (
    <header className="sticky top-0 z-[100] glass px-4 sm:px-8 md:px-16 py-4 md:py-5 flex items-center justify-between">
      <div className="flex items-center space-x-2 sm:space-x-4">
        <div className="bg-white text-black px-1.5 sm:px-2 py-0.5 font-black text-base sm:text-xl tracking-tighter leading-none select-none">
          404
        </div>
        <span className="text-lg sm:text-2xl font-black tracking-tighter uppercase font-sans">BASED404</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center space-x-2 sm:space-x-3 bg-white/5 border border-white/10 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full">
          <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-rose-500 rounded-full status-pulse shadow-[0_0_10px_#f43f5e]"></div>
          <span className="text-[8px] sm:text-[10px] font-bold tracking-[2px] sm:tracking-[3px] uppercase opacity-80">
            VIBE: UNCHAINED
          </span>
        </div>

        {/* Login Button */}
        {onLoginClick && (
          <button
            onClick={onLoginClick}
            className="w-8 h-8 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors flex items-center justify-center"
            aria-label="Login"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
