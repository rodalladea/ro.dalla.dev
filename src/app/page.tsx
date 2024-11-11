'use client'

import { useState, useEffect, useCallback } from 'react'
import tmuxDisplayDate from "@/utils/tmuxDisplayDate"

const files = [
    { name: 'about/', type: 'dir' },
    { name: 'projects/', type: 'dir' },
]

export default function Component() {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [cursorPosition, setCursorPosition] = useState(0)

    const moveCursor = useCallback((direction: 'left' | 'right') => {
        setCursorPosition((prev) => {
            const currentFileName = files[selectedIndex].name
            if (direction === 'left') {
                return Math.max(0, prev - 1)
            } else {
                return Math.min(currentFileName.length - 1, prev + 1)
            }
        })
    }, [selectedIndex])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
            case 'j':
                setSelectedIndex((prevIndex) => (prevIndex + 1) % files.length)
                setCursorPosition(0)
                break
            case 'k':
                setSelectedIndex((prevIndex) => (prevIndex - 1 + files.length) % files.length)
                setCursorPosition(0)
                break
            case 'h':
                moveCursor('left')
                break
            case 'l':
                moveCursor('right')
                break
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [moveCursor])

    const [borderWidth, setBorderWidth] = useState(40)
    useEffect(() => {
        const updateBorderWidth = () => {
            const width = Math.floor(window.innerWidth / 15) // Assuming 10px per character
            setBorderWidth(width)
        }

        updateBorderWidth()
        window.addEventListener('resize', updateBorderWidth)

        return () => {
            window.removeEventListener('resize', updateBorderWidth)
        }
    }, [])

    const borderLine = "=".repeat(borderWidth)

    const [displayDate, setDisplayDate] = useState(tmuxDisplayDate(new Date()))
    useEffect(() => {
        const displayDateInterval = setInterval(() => {
            const newValue = tmuxDisplayDate(new Date())
            setDisplayDate(newValue)
        }, 1000)

        return () => clearInterval(displayDateInterval);
    }, [])

    return (
        <div className="min-h-screen bg-terminal-black text-terminal-text-primary text-xs sm:text-base font-medium p-0 m-0">
            <div className="text-terminal-text-secondary mb-2">
                <div>
                    <span className="mr-2">"</span>{borderLine}
                </div>
                <div>
                    <div className="flex justify-between">
                        <span><span className="mr-2">"</span>Netrw Directory Listing</span>
                        <span className="text-terminal-text-primary">(netrw v173)</span>
                    </div>
                    <div>
                        <span className="mr-2">"</span><span className="ml-4">/ro.dalla.dev/src/app</span>
                    </div>
                    <div className="flex">
                        <span className="mr-2">"</span>
                        <div className="ml-4 text-terminal-text-green">
                            This is my portfolio website, where I aim to share more about myself and my projects. The design is inspired by NeoVim, the platform I use for coding.
                        </div>
                    </div>
                    <div>
                        <span className="mr-2">"</span>
                        <span className="ml-4">Quick Help: </span><span className="text-terminal-text-pink">h</span>:<span className="text-terminal-text-primary">move cursor to left</span>{' '}
                        <span className="text-terminal-text-pink">j</span>:<span className="text-terminal-text-primary">move cursor down</span>{' '}
                        <span className="text-terminal-text-pink">k</span>:<span className="text-terminal-text-primary">move cursor up</span>{' '}
                        <span className="text-terminal-text-pink">l</span>:<span className="text-terminal-text-primary">move cursor to right</span>{' '}
                        <span className="text-terminal-text-pink">{"[enter]"}</span>:<span className="text-terminal-text-primary">enter the page</span>{' '}
                    </div>
                    <div>
                        <span className="mr-2">"</span>
                        <span className="text-terminal-black bg-terminal-text-red">It's not possible to enter the pages yet</span>
                    </div>
                </div>
                <div>
                    <span className="mr-2">"</span>{borderLine}
                </div>
            </div>

            <div className="px-2">
                {files.map((file, index) => (
                    <div
                        key={file.name}
                        className={`${index === selectedIndex ? 'bg-terminal-selected' : ''}`}
                    >
                        {file.name.split('').map((char, charIndex) => (
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

            <div className="flex flex-col fixed bottom-0 left-0 right-0">
                <div className="bg-terminal-highlight">
                    <span className="bg-terminal-text-pink text-terminal-black px-2 inline-block font-extrabold">NORMAL</span>
                    <span className="text-terminal-text-pink px-2 bg-terminal-highlight-high">main | ~25 -1</span>
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
                    <span className="float-right text-terminal-text-foam">{displayDate}</span>
                </div>
            </div>
        </div>
    )
}
