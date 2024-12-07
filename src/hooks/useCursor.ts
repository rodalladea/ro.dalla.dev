import { CursorContext } from "@/context/Cursor"
import { useContext } from "react"

export function useCursor() {
    const context = useContext(CursorContext)

    if (!context) {
        throw new Error("useCursor should be used inside of a <CursorProvider>")
    }

    return context
}
