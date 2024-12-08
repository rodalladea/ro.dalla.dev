'use client'

import Content from '@/components/Content'
import { IContent } from '@/context/Cursor'
import { useCursor } from '@/hooks/useCursor'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Component() {
    const { setContents } = useCursor()
    const router = useRouter()

    const mainMenu: IContent[] = [
        { line: "about.txt", action: () => { router.push("about.txt") } },
        { line: "projects/", action: () => { router.push("projects") } },
        { line: "social/", action: () => { router.push("social") } }
    ]

    useEffect(() => {
        setContents(mainMenu)
    }, [])

    return <Content />
}
