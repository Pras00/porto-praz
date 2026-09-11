'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Resume', path: '/resume' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Monitor scrolling to add stronger background when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-[#090d16]/90 border-b border-slate-200 dark:border-neon-blue/20 backdrop-blur-md shadow-sm dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
          : 'bg-white/90 dark:bg-[#090d16]/80 border-b border-slate-200/80 dark:border-slate-800/40 backdrop-blur-md'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Title */}
          <Link href="/" className="flex items-center gap-2.5 group focus:outline-none">
            <Logo size={34} showBadge={true} interactive={true} />
            <span className="font-mono text-lg font-bold tracking-tight bg-linear-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent group-hover:brightness-110 transition-all duration-300">
              Prazz()
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg ${
                    isActive
                      ? 'text-neon-blue dark:text-neon-blue-light font-semibold text-glow-blue'
                      : 'text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 bg-neon-blue/10 border border-neon-blue/30 rounded-lg -z-10 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                    />
                  )}
                </Link>
              );
            })}
            
            <div className="pl-1">
              <ThemeToggle />
            </div>

            <Link
              href="/contact"
              className="ml-2 px-4 py-2 text-xs font-mono font-semibold text-neon-blue border border-neon-blue/40 rounded-lg hover:bg-neon-blue/10 hover:border-neon-blue hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300"
            >
              {"Let's Connect"}
            </Link>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none transition-colors duration-300 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-b border-slate-200 dark:border-neon-blue/20 bg-white/95 dark:bg-[#090d16]/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-neon-blue/10 border-l-2 border-neon-blue text-neon-blue dark:text-neon-blue-light font-semibold text-glow-blue'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-900/50'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="pt-4 px-4">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-3 text-center text-sm font-mono font-semibold text-neon-blue border border-neon-blue/40 rounded-lg hover:bg-neon-blue/10 transition-all duration-300"
                >
                  {"Let's Connect"}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
