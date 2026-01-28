"use client"

import { useState, useEffect } from "react"

const LiveUserCounter = () => {
    const [count, setCount] = useState(142)

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => {
                const change = Math.floor(Math.random() * 5) - 2 // -2 to +2
                // Keep within believable bounds
                if (prev < 120) return prev + 3
                if (prev > 180) return prev - 3
                return prev + change
            })
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex items-center gap-1 sm:gap-2">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
            <span className="tabular-nums">
                <span className="hidden xs:inline">DOSED </span>USERS: {count.toLocaleString()}
            </span>
        </div>
    )
}

export default LiveUserCounter
