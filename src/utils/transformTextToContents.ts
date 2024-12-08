export default function transformTextToContents(data: string) {
    return data
        .split("\n")
        .filter((line) => line)
        .map((line) => ({ line }))
}
