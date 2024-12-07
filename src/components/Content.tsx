"use client"

import { useCursor } from "@/hooks/useCursor"

export interface ContentProps {
    content: {
        line: string
    }[]
}

export default function Content({ content }: ContentProps) {
    const { selectedIndex, cursorPosition } = useCursor()

    return <div className="px-2 text-terminal-text-primary text-xs sm:text-base font-medium">
        {content.map((c, index) => (
            <div
                key={c.line}
                className={`${index === selectedIndex ? 'bg-terminal-selected' : ''}`}
            >
                {c.line.split('').map((char, charIndex) => (
                    <span key={charIndex} className="inline-block">
                        {index === selectedIndex && charIndex === cursorPosition ? (
                            <span className="bg-terminal-text-primary text-terminal-black inline-block">
                                {char}
                            </span>
                        ) : (
                            char
                        )}
                    </span>
                ))}
            </div>
        ))}
    </div>

}
