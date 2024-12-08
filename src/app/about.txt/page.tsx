"use client"

import Content from "@/components/Content";
import { useCursor } from "@/hooks/useCursor";
import transformTextToContents from "@/utils/transformTextToContents";
import { useEffect } from "react";

export default function about() {
    const { setContents } = useCursor()

    useEffect(() => {
        setContents([{ line: "Loading..." }])

        fetch("source/about.txt")
            .then((response) => response.text())
            .then((data) => setContents(transformTextToContents(data)))
            .catch((error) => {
                console.error("Error loading file", error)
                setContents([{ line: "Erro ao carregar o arquivo" }])
            })
    }, [])

    return <Content />
}
