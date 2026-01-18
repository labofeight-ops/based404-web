import type React from "react"

interface HeaderProps {
  onLoginClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  return (
    <header className="sticky top-0 z-[100] bg-black/80 backdrop-blur-xl border-b border-[#2a2a2a] px-4 sm:px-8 md:px-16 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-white text-black px-2 py-0.5 font-bold text-xl tracking-tight">
            404
          </div>
          <span className="text-xl font-semibold tracking-tight">BASED404</span>
        </div>

        {onLoginClick && (
          <button
            onClick={onLoginClick}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/15 transition-all duration-200 text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>LOGIN</span>
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
