"use client"

import Content from "@/components/Content";
import { useCursor } from "@/hooks/useCursor";
import { useEffect } from "react";

export default function about() {
    const { setContents } = useCursor()

    useEffect(() => {
        setContents([{
            line: "Github - https://github.com/rodalladea",
            action: () => window.open("https://github.com/rodalladea", "_blank")
        }])
    }, [])

    return <Content />
}
