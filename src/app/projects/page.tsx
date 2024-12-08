"use client"

import Content from "@/components/Content";
import { useCursor } from "@/hooks/useCursor";
import { useEffect } from "react";

export default function Projects() {
    const { setContents } = useCursor()

    useEffect(() => {
        setContents([{ line: "This is the only project for now..." }])
    }, [])

    return <Content />
}
