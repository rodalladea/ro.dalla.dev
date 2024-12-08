"use client"

import { usePathname } from "next/navigation"
import React, { createContext, useState, useEffect, useCallback, ReactNode } from "react"

export interface IContent {
    line: string
    action?: () => void
}

interface CursorContextType {
    contents: IContent[]
    selectedIndex: number
    cursorPosition: number
    moveCursor: (direction: "left" | "right") => void
    setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
    setCursorPosition: React.Dispatch<React.SetStateAction<number>>
    setContents: React.Dispatch<React.SetStateAction<IContent[]>>
}

export const CursorContext = createContext<CursorContextType | undefined>(undefined)

interface CursorProviderProps {
    children: ReactNode
}

export const CursorProvider: React.FC<CursorProviderProps> = ({ children }) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [cursorPosition, setCursorPosition] = useState<number>(0)
    const [contents, setContents] = useState<IContent[]>([])
    const pathname = usePathname()

    const moveCursor = useCallback((direction: "left" | "right") => {
        setCursorPosition((prev) => {
            const currentFileName = contents[selectedIndex]?.line ?? ""
            if (direction === "left") {
                return Math.max(0, prev - 1)
            } else {
                return Math.min(currentFileName.length - 1, prev + 1)
            }
        })
    }, [selectedIndex, contents])

    useEffect(() => {
        setSelectedIndex(0)
        setCursorPosition(0)
    }, [pathname])

    useEffect(() => {
        const keysPressed: string[] = []

        const handleKeyDown = (event: KeyboardEvent) => {
            keysPressed.push(event.key.toLowerCase())

            if (keysPressed.length > 3) {
                keysPressed.shift()
            }

            if (keysPressed.join('') === ' pv') {
                window.history.back()
            }

            switch (event.key) {
            case "j":
                setSelectedIndex((prevIndex) => (prevIndex + 1) >= contents.length ? prevIndex : prevIndex + 1)

                const nextContent = contents[(selectedIndex + 1) >= contents.length ? selectedIndex : selectedIndex + 1]
                if (nextContent) {
                    setCursorPosition(
                        (prevPos) => prevPos > (nextContent.line.length - 1) ?
                            nextContent.line.length - 1 :
                            prevPos
                    )
                }
                break
            case "k":
                setSelectedIndex((prevIndex) => (prevIndex - 1) < 0 ? prevIndex : prevIndex - 1)

                const prevContent = contents[(selectedIndex - 1) < 0 ? selectedIndex : selectedIndex - 1]
                if (prevContent) {
                    setCursorPosition(
                        (prevPos) => prevPos > (prevContent.line.length - 1) ?
                            prevContent.line.length - 1 :
                            prevPos
                    )
                }
                break
            case "h":
                moveCursor("left")
                break
            case "l":
                moveCursor("right")
                break
            case "Enter":
                contents[selectedIndex]?.action?.()
                break
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [moveCursor, contents, selectedIndex])

    const value: CursorContextType = {
        contents,
        selectedIndex,
        cursorPosition,
        moveCursor,
        setSelectedIndex,
        setCursorPosition,
        setContents,
    }

    return (
        <CursorContext.Provider value={value}>
            {children}
        </CursorContext.Provider>
    )
}
