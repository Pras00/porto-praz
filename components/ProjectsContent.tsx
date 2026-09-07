'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderGit2 } from 'lucide-react';
import { projects } from '@/data/portfolioData';
import ProjectCard from './ProjectCard';

const categories = [
  { id: 'all', name: 'All Projects' },
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
  { id: 'fullstack', name: 'Fullstack' },
];

export default function ProjectsContent() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((project) => project.category === activeCategory);

  return (
    <div className="space-y-12 py-8 md:py-12">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
        <div className="text-center md:text-left space-y-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            My Creative{' '}
            <span className="bg-linear-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent text-glow-dual">
              Projects
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-md">
            {"A curated selection of applications I've built, ranging from frontend tools to backend configurations."}
          </p>
        </div>

        {/* Counter Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-400">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Showing {filteredProjects.length} Projects</span>
        </div>
      </div>

      {/* Category Selection Filter Bar */}
      <div className="flex flex-wrap justify-center md:justify-start gap-2 border-b border-slate-200 dark:border-slate-900/60 pb-6">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`relative px-4 py-2 text-xs font-mono font-semibold rounded-lg border transition-all duration-300 ${
                isActive
                  ? 'border-neon-blue/40 text-neon-blue dark:text-neon-blue-light shadow-[0_0_12px_rgba(59,130,246,0.15)] bg-neon-blue/10'
                  : 'border-slate-200 dark:border-slate-800/80 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-950/20'
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Projects Card Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <FolderGit2 className="w-12 h-12 text-slate-700 mb-3" />
          <h3 className="text-white font-bold">No Projects Found</h3>
          <p className="text-slate-500 text-sm mt-1">Check back later for more updates!</p>
        </motion.div>
      )}
    </div>
  );
}
