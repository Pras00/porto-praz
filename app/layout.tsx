import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: "Prazz | Creative Web Developer & Next.js Specialist",
  description: "Explore the professional Web Developer Portfolio of Alex Rivera. A Frontend Developer specializing in high-performance Next.js apps, TypeScript, and interactive Tailwind CSS designs.",
  keywords: [
    "Web Developer Portfolio",
    "Next.js Developer",
    "Frontend Developer",
    "TypeScript Developer",
    "React Engineer",
    "Tailwind CSS v4"
  ],
  authors: [{ name: "Prasetia Wahyu Ramadhan" }],
  creator: "Prasetia Wahyu Ramadhan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-navy-dark text-slate-100 selection:bg-neon-blue/35 selection:text-white">
        {/* Ambient background designs */}
        <div className="fixed inset-0 grid-overlay -z-20 pointer-events-none" />
        
        {/* Glowing backdrop blur blobs */}
        <div className="fixed top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-neon-blue/10 blur-[160px] -z-10 pointer-events-none" />
        <div className="fixed bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-neon-purple/10 blur-[160px] -z-10 pointer-events-none" />

        {/* Global Navigation Header */}
        <Navbar />

        {/* Dynamic page content wrapper */}
        <main className="flex-1 flex flex-col relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
