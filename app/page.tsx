'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Code2, Sparkles } from 'lucide-react';
import { developerInfo } from '@/data/portfolioData';

// Stagger variant configuration for entry animations
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] py-12 md:py-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8"
      >
        {/* Intro Text Section */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Accent Label */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neon-blue/10 border border-neon-blue/30 text-xs font-mono font-bold text-neon-blue-light tracking-wide uppercase mb-6 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Available for Hire</span>
          </motion.div>

          {/* Heading Name */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4"
          >
            {"Hi, I'm "}{' '}
            <span className="bg-linear-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(139,92,246,0.15)]">
              {developerInfo.name}
            </span>
          </motion.h1>

          {/* Professional Tagline */}
          <motion.h2
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-700 dark:text-slate-300 mb-6 font-sans tracking-wide text-glow-dual"
          >
            {developerInfo.tagline}
          </motion.h2>

          {/* Subtagline / Brief Bio */}
          <motion.p
            variants={itemVariants}
            className="text-slate-600 dark:text-slate-400 text-sm sm:text-base md:text-lg max-w-lg leading-relaxed mb-8"
          >
            {developerInfo.subTagline}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link
              href="/projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-mono font-semibold text-white bg-linear-to-r from-neon-blue to-neon-purple hover:brightness-110 rounded-xl glow-dual-hover shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] transition-all duration-300 hover:scale-[1.02]"
            >
              <Code2 className="w-4 h-4" />
              View Projects
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-mono font-semibold text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-white/80 hover:bg-white dark:bg-slate-900/40 dark:hover:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:border-neon-blue/40 shadow-sm dark:shadow-none rounded-xl transition-all duration-300 hover:scale-[1.02]"
            >
              Contact Me
            </Link>
          </motion.div>

          {/* Micro Stat Dashboard Info */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex items-center justify-center lg:justify-start gap-6 border-t border-slate-200 dark:border-slate-900 pt-6 w-full max-w-md"
          >
            <div className="flex flex-col items-center lg:items-start">
              <span className="text-xl font-bold font-mono text-neon-blue dark:text-neon-blue-light text-glow-blue">3+</span>
              <span className="text-xs text-slate-500 font-mono mt-0.5">Years Experience</span>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-800" />
            <div className="flex flex-col items-center lg:items-start">
              <span className="text-xl font-bold font-mono text-neon-purple dark:text-neon-purple-light text-glow-purple">15+</span>
              <span className="text-xs text-slate-500 font-mono mt-0.5">Completed Projects</span>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-800" />
            <div className="flex flex-col items-center lg:items-start">
              <span className="text-xl font-bold font-mono text-emerald-500 dark:text-emerald-400">100%</span>
              <span className="text-xs text-slate-500 font-mono mt-0.5">Client Satisfaction</span>
            </div>
          </motion.div>
        </div>

        {/* Profile Image with Rotating Neon Gradient Border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.2 }}
          className="flex-1 flex justify-center items-center"
        >
          {/* Subtle floating animation wrapper */}
          <motion.div
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full glow-rotate-wrapper p-1 glow-dual transition-all duration-300"
          >
            {/* Spinning gradient border overlay */}
            <div className="glow-rotate-border rounded-full" />
            
            {/* Inner background box */}
            <div className="relative w-full h-full rounded-full bg-slate-100 dark:bg-[#0a0f1d] flex items-center justify-center overflow-hidden z-10">
              <Image
                src="/prass.png"
                alt={developerInfo.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 256px, 320px"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
