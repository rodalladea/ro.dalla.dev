'use client'

import Content from '@/components/Content'
import { IContent } from '@/context/Cursor'
import { useCursor } from '@/hooks/useCursor'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'


export default function Component() {
    const { setContents } = useCursor()
    const router = useRouter()

    const mainMenu: IContent[] = [
        { line: "about.txt", action: () => { router.push("about.txt") } },
        { line: "projects/", action: () => { router.push("projects") } },
        { line: "social/", action: () => { router.push("social") } }
    ]

    const [borderWidth, setBorderWidth] = useState(40)
    useEffect(() => {
        setContents(mainMenu)

        const updateBorderWidth = () => {
            const width = Math.floor(window.innerWidth / 15) // Assuming 10px per character
            setBorderWidth(width)
        }

        updateBorderWidth()
        window.addEventListener("resize", updateBorderWidth)

        return () => {
            window.removeEventListener("resize", updateBorderWidth)
        }
    }, [])

    const borderLine = "=".repeat(borderWidth)

    return (
        <>
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
                        <span className="text-terminal-text-pink">{"[space]pv"}</span>:<span className="text-terminal-text-primary">back to menu</span>{' '}
                    </div>
                </div>
                <div>
                    <span className="mr-2">"</span>{borderLine}
                </div>
            </div>

            <Content />
        </>
    )
}
