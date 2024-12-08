import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { CursorProvider } from "@/context/Cursor";
import Header from "@/components/Header";

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
                    <div className="min-h-screen bg-terminal-black text-terminal-text-primary text-xs sm:text-base font-medium p-0 m-0">
                        <Header />
                        {children}
                        <Footer />
                    </div>
                </CursorProvider>
            </body>
        </html>
    );
}
