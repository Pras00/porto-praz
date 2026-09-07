'use client';

import React, { useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="relative flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 dark:border-neon-blue/30 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:border-neon-blue/50 dark:hover:border-neon-blue hover:shadow-[0_0_15px_rgba(59,130,246,0.25)] transition-all duration-300 focus:outline-none cursor-pointer overflow-hidden group"
      aria-label={isDark ? 'Beralih ke Tema Terang' : 'Beralih ke Tema Gelap'}
      title={isDark ? 'Tema Terang (Light Mode)' : 'Tema Gelap (Dark Mode)'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ y: -16, opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
            exit={{ y: 16, opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="flex items-center justify-center"
          >
            <Moon className="w-4 h-4 text-neon-purple-light group-hover:text-neon-purple drop-shadow-[0_0_8px_rgba(192,132,252,0.6)]" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: -16, opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
            exit={{ y: 16, opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="flex items-center justify-center"
          >
            <Sun className="w-4 h-4 text-amber-500 group-hover:text-amber-600 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
