'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Layout, Settings } from 'lucide-react';

interface SkillBadgeProps {
  name: string;
  category: 'frontend' | 'backend' | 'tools';
}

export default function SkillBadge({ name, category }: SkillBadgeProps) {
  // Select color schemes and icons depending on skill category
  const getCategoryStyles = () => {
    switch (category) {
      case 'frontend':
        return {
          bg: 'bg-blue-500/10 hover:bg-blue-500/15 dark:bg-blue-950/40 dark:hover:bg-blue-950/60',
          border: 'border-blue-500/25 hover:border-blue-500/50',
          text: 'text-blue-600 dark:text-blue-400',
          glow: 'hover:shadow-[0_0_15px_rgba(59,130,246,0.35)]',
          icon: Layout,
        };
      case 'backend':
        return {
          bg: 'bg-purple-500/10 hover:bg-purple-500/15 dark:bg-purple-950/40 dark:hover:bg-purple-950/60',
          border: 'border-purple-500/25 hover:border-purple-500/50',
          text: 'text-purple-600 dark:text-purple-400',
          glow: 'hover:shadow-[0_0_15px_rgba(139,92,246,0.35)]',
          icon: Cpu,
        };
      case 'tools':
      default:
        return {
          bg: 'bg-emerald-500/10 hover:bg-emerald-500/15 dark:bg-emerald-950/40 dark:hover:bg-emerald-950/60',
          border: 'border-emerald-500/25 hover:border-emerald-500/50',
          text: 'text-emerald-600 dark:text-emerald-400',
          glow: 'hover:shadow-[0_0_15px_rgba(16,185,129,0.35)]',
          icon: Settings,
        };
    }
  };

  const styles = getCategoryStyles();
  const Icon = styles.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-300 cursor-default ${styles.bg} ${styles.border} ${styles.text} ${styles.glow}`}
    >
      <Icon className="w-4 h-4 shrink-0" />
      <span>{name}</span>
    </motion.div>
  );
}
