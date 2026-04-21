import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Toaster } from "@/components/ui/sonner";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Games & Tournaments",
  description: "Tournaments feature demo (Next.js App Router + shadcn)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <header className="border-b">
            <div className="mx-auto w-full max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
              <div className="font-heading font-semibold leading-none">
                Games & Tournaments
              </div>
              <ThemeToggle />
            </div>
          </header>
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
            {children}
          </main>
          <Toaster richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
