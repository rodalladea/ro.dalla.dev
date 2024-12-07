import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { CursorProvider } from "@/context/Cursor";

const jetBrains = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "rodalladev | Rodrigo Dalla Dea",
    description: "Web developer skilled in Next.js, React, Node.js, and Go, with knowledge in deployment and cloud infrastructure.",
    robots: {
        index: true,
        follow: true,
    },
};


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${jetBrains.className} antialiased`}>
                <CursorProvider>
                    {children}
                </CursorProvider>
                <Footer />
            </body>
        </html>
    );
}
