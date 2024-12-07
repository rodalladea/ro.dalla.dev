"use client"

import tmuxDisplayDate from "@/utils/tmuxDisplayDate"
import { useEffect, useState } from "react"

export default function Footer() {
    const [displayDate, setDisplayDate] = useState(tmuxDisplayDate(new Date()))
    useEffect(() => {
        const displayDateInterval = setInterval(() => {
            const newValue = tmuxDisplayDate(new Date())
            setDisplayDate(newValue)
        }, 1000)

        return () => clearInterval(displayDateInterval);
    }, [])

    return <div className="flex flex-col fixed bottom-0 left-0 right-0 bg-terminal-black text-terminal-text-primary text-xs sm:text-base font-medium p-0 m-0">
        <div className="bg-terminal-highlight">
            <span className="bg-terminal-text-pink text-terminal-black px-2 inline-block font-extrabold">NORMAL</span>
            <span className="text-terminal-text-pink px-2 bg-terminal-highlight-high">master | ~25 -1</span>
            <span className="px-2">src/app [-]</span>
            <span className="float-right">
                <span className="px-2">netrw</span>
                <span className="text-terminal-text-pink px-2 bg-terminal-highlight-high">14%</span>
                <span className="bg-terminal-text-pink text-terminal-black px-2 inline-block font-extrabold">19:97</span>
            </span>
        </div>

        <div className="bg-terminal-black">
            "/ro.dalla.dev/src/app" 0L, created
        </div>

        <div className="bg-terminal-black pb-2">
            <span>base</span>
            <span className="text-terminal-text-pink"> nvim</span>
            <span className="text-terminal-text-gold"> 0 - nvim</span>
            <span className="float-right text-terminal-text-foam mr-6">{displayDate}</span>
        </div>
    </div>
}
