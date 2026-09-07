import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";

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
  description: "Explore the professional Web Developer Portfolio of Prazz (Prasetia Wahyu Ramadhan). A Creative Web Developer specializing in high-performance Next.js apps, TypeScript, and interactive Tailwind CSS designs.",
  keywords: [
    "Prazz Developer",
    "Prasetia Wahyu Ramadhan",
    "Web Developer Portfolio",
    "Next.js Developer",
    "Frontend Developer",
    "TypeScript Developer",
    "React Engineer",
    "Tailwind CSS v4"
  ],
  authors: [{ name: "Prasetia Wahyu Ramadhan" }],
  creator: "Prasetia Wahyu Ramadhan",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('theme');
                if (savedTheme === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                } else {
                  document.documentElement.classList.remove('light');
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 selection:bg-neon-blue/35 selection:text-white transition-colors duration-300">
        <ThemeProvider>
          {/* Ambient background designs */}
          <div className="fixed inset-0 grid-overlay -z-20 pointer-events-none" />
          
          {/* Glowing backdrop blur blobs */}
          <div className="fixed top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-neon-blue/15 dark:bg-neon-blue/10 blur-[160px] -z-10 pointer-events-none" />
          <div className="fixed bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-neon-purple/15 dark:bg-neon-purple/10 blur-[160px] -z-10 pointer-events-none" />

          {/* Global Navigation Header */}
          <Navbar />

          {/* Dynamic page content wrapper */}
          <main className="flex-1 flex flex-col relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
            {children}
          </main>

          {/* Global Footer */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
