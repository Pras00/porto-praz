'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, ArrowRight } from 'lucide-react';

interface TimelineItem {
  id: string;
  title: string;      // Role or Degree
  subtitle: string;   // Company or School
  period: string;
  description: string | string[];
}

interface TimelineProps {
  items: TimelineItem[];
  type: 'experience' | 'education';
}

export default function Timeline({ items, type }: TimelineProps) {
  const Icon = type === 'experience' ? Briefcase : GraduationCap;
  const isExperience = type === 'experience';

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.2, duration: 0.6 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-100px' }}
      className="relative pl-6 md:pl-8 border-l border-slate-200 dark:border-slate-800 space-y-12 py-2"
    >
      {items.map((item) => (
        <motion.div key={item.id} variants={itemVariants} className="relative group">
          {/* Glowing node point on the timeline line */}
          <div className="absolute -left-7.75 md:-left-9.75 top-1.5 flex items-center justify-center">
            <div className={`w-4 h-4 rounded-full border-2 bg-white dark:bg-navy-dark transition-all duration-300 group-hover:scale-125 ${
              isExperience 
                ? 'border-blue-500 group-hover:bg-blue-500 group-hover:shadow-[0_0_12px_#3b82f6]' 
                : 'border-purple-500 group-hover:bg-purple-500 group-hover:shadow-[0_0_12px_#8b5cf6]'
            }`} />
          </div>

          {/* Timeline Card */}
          <div className="glass-panel hover:border-slate-300 dark:hover:border-slate-800/80 rounded-xl p-5 md:p-6 transition-all duration-300 relative overflow-hidden group-hover:translate-x-1">
            {/* Subtle glow background */}
            <div className={`absolute -right-16 -top-16 w-32 h-32 rounded-full blur-3xl opacity-10 transition-opacity duration-300 group-hover:opacity-25 ${
              isExperience ? 'bg-blue-500' : 'bg-purple-500'
            }`} />

            {/* Header info */}
            <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
              <div>
                <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white transition-colors">
                  {item.title}
                </h3>
                <p className={`text-sm font-semibold flex items-center gap-1.5 mt-0.5 ${
                  isExperience ? 'text-blue-600 dark:text-blue-400' : 'text-purple-600 dark:text-purple-400'
                }`}>
                  <Icon className="w-4 h-4 shrink-0" />
                  {item.subtitle}
                </p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 font-mono">
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                {item.period}
              </div>
            </div>

            {/* Description list / text */}
            {Array.isArray(item.description) ? (
              <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-xs md:text-sm">
                {item.description.map((desc, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <ArrowRight className={`w-3.5 h-3.5 mt-1 shrink-0 ${
                      isExperience ? 'text-blue-500 dark:text-blue-500/60' : 'text-purple-500 dark:text-purple-500/60'
                    }`} />
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed">
                {item.description}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
