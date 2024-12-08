"use client"

import { useCursor } from "@/hooks/useCursor"
import tmuxDisplayDate from "@/utils/tmuxDisplayDate"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function Footer() {
    const { contents, selectedIndex, cursorPosition } = useCursor()

    const [displayDate, setDisplayDate] = useState(tmuxDisplayDate(new Date()))
    useEffect(() => {
        const displayDateInterval = setInterval(() => {
            const newValue = tmuxDisplayDate(new Date())
            setDisplayDate(newValue)
        }, 1000)

        return () => clearInterval(displayDateInterval);
    }, [])

    const pathname = usePathname()

    return <div className="flex flex-col fixed bottom-0 left-0 right-0 bg-terminal-black text-terminal-text-primary text-xs sm:text-base font-medium p-0 m-0">
        <div className="bg-terminal-highlight">
            <span className="bg-terminal-text-pink text-terminal-black px-2 inline-block font-extrabold">NORMAL</span>
            <span className="text-terminal-text-pink px-2 bg-terminal-highlight-high">master | ~25 -1</span>
            <span className="px-2">src/app{pathname === "/" ? "" : pathname} [-]</span>
            <span className="float-right">
                <span className="px-2">netrw</span>
                <span className="inline-block text-terminal-text-pink px-2 bg-terminal-highlight-high w-14 text-center">
                    {contents.length ? `${Math.floor(((selectedIndex + 1) / contents.length) * 100)}%` : "nil"}
                </span>
                <span className="bg-terminal-text-pink text-terminal-black px-2 inline-block font-extrabold">{selectedIndex + 1}:{cursorPosition + 1}</span>
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
