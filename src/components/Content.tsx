"use client"

import { useCursor } from "@/hooks/useCursor"


export default function Content() {
    const { selectedIndex, cursorPosition, contents } = useCursor()

    return <div className="px-2 text-terminal-text-primary text-xs sm:text-base font-medium whitespace-pre">
        {contents.map((content, index) => {
            return <div
                key={content.line.trim() || crypto.randomUUID()}
                className={`${index === selectedIndex ? 'bg-terminal-selected' : ''}`}
            >
                {content.line.split('').map((char, charIndex) => (
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
        })}
    </div>
}
