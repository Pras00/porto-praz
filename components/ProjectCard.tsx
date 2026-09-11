'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Terminal } from 'lucide-react';
import { Project } from '@/types/portfolio';

// Custom SVG Github Icon
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const isRealImage = Boolean(
    project.image &&
      (project.image.startsWith('http://') ||
        project.image.startsWith('https://') ||
        project.image.startsWith('data:image/') ||
        project.image.startsWith('/') ||
        /\.(png|jpg|jpeg|webp|svg|gif)$/i.test(project.image))
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group glass-panel rounded-2xl overflow-hidden flex flex-col h-full hover:border-neon-purple/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.25)] transition-all duration-300"
    >
      {/* Project Visual Header */}
      {isRealImage ? (
        <div className="w-full h-48 sm:h-52 relative overflow-hidden bg-slate-900 select-none border-b border-slate-200 dark:border-slate-800/80">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
          {/* Soft gradient overlay at bottom */}
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

          {/* Floating badges */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
            {project.featured && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-400 text-slate-950 shadow-md backdrop-blur-md">
                ⭐ Featured
              </span>
            )}
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-950/75 text-slate-200 border border-white/10 backdrop-blur-md">
              {project.category}
            </span>
          </div>
        </div>
      ) : (
        /* Fallback: Cyber code editor header */
        <div
          className="w-full h-48 relative flex items-center justify-center p-6 overflow-hidden select-none border-b border-slate-900"
          style={{
            background:
              project.image ||
              'linear-gradient(135deg, #1e1e38 0%, #0d1117 100%)',
          }}
        >
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.25)_1px,transparent_1px),linear-gradient(to_right,rgba(0,0,0,0.25)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

          {/* Mock window decoration */}
          <div className="w-[85%] h-[80%] rounded-lg bg-navy-dark/90 border border-slate-800/80 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden relative backdrop-blur-md group-hover:border-neon-blue/20 transition-all duration-300">
            <div className="w-full h-6 border-b border-slate-900 bg-slate-950/80 px-2 flex items-center gap-1.5 justify-between">
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
              <span className="text-[10px] text-slate-500 font-mono">
                {project.title.toLowerCase().replace(/\s+/g, '-')}.config
              </span>
              <div className="w-6" />
            </div>

            <div className="flex-1 p-3 font-mono text-[9px] text-slate-400 flex flex-col justify-between">
              <div>
                <span className="text-neon-blue-light">const</span> project = &#123;
                <div className="pl-3">
                  title: <span className="text-neon-purple-light">{"\""}{project.title}{"\""}</span>,
                  techStack: [
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span key={tech}>
                        <span className="text-emerald-400">{"\""}{tech}{"\""}</span>
                        {i < 2 ? ', ' : ''}
                      </span>
                    ))}
                  ]
                </div>
                &#125;;
              </div>
              <div className="text-[8px] text-slate-500 flex items-center gap-1">
                <Terminal className="w-3 h-3 text-neon-blue-light" />
                <span>Compilation successful.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Card Info Content */}
      <div className="p-5 md:p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-neon-blue dark:group-hover:text-neon-blue-light transition-colors duration-300 flex items-center justify-between">
          {project.title}
          {!isRealImage && (
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 uppercase">
              {project.category}
            </span>
          )}
        </h3>

        <p className="text-slate-600 dark:text-slate-400 text-sm mt-3 leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tech tags list */}
        <div className="flex flex-wrap gap-1.5 mt-5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action button triggers */}
        <div className="flex items-center gap-3 mt-6 pt-5 border-t border-slate-200 dark:border-slate-900/50">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-mono font-semibold bg-neon-blue/10 dark:bg-neon-blue/15 hover:bg-neon-blue/20 dark:hover:bg-neon-blue/25 text-neon-blue dark:text-neon-blue-light border border-neon-blue/30 hover:border-neon-blue/50 rounded-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/60 dark:hover:bg-slate-900 text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-lg transition-all duration-300"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            Source Code
          </a>
        </div>
      </div>
    </motion.div>
  );
}
