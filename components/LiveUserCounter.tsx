"use client"

import { useState, useEffect } from "react"

const LiveUserCounter = () => {
    const [count, setCount] = useState(4024)

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => {
                const change = Math.floor(Math.random() * 7) - 3 // -3 to +3
                return prev + change
            })
        }, 4000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
            <span>ONLINE: {count.toLocaleString()}</span>
        </div>
    )
}

export default LiveUserCounter
