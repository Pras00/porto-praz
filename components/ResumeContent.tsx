'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { User, Briefcase, GraduationCap, Code2 } from 'lucide-react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import SkillBadge from './SkillBadge';
import Timeline from './Timeline';

// Framer motion animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

export default function ResumeContent() {
  const { developerInfo, skills, experiences, educationList } = usePortfolioStore();

  // Group skills by category
  const frontendSkills = skills.filter((s) => s.category === 'frontend');
  const backendSkills = skills.filter((s) => s.category === 'backend');
  const toolSkills = skills.filter((s) => s.category === 'tools');

  // Map data to the format Timeline expects
  const mappedExperiences = experiences.map((exp) => ({
    id: exp.id,
    title: exp.role,
    subtitle: exp.company,
    period: exp.period,
    description: exp.description,
  }));

  const mappedEducation = educationList.map((edu) => ({
    id: edu.id,
    title: edu.degree,
    subtitle: edu.school,
    period: edu.period,
    description: edu.description,
  }));

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="space-y-16 py-8 md:py-12"
    >
      {/* Page Header */}
      <motion.div variants={fadeInUp} className="text-center md:text-left space-y-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          My{' '}
          <span className="bg-linear-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent text-glow-dual">
            Resume
          </span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-lg">
          A summary of my professional journey, academic background, and technical skillset.
        </p>
      </motion.div>

      {/* About Me Section */}
      <motion.section variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 flex flex-col justify-between p-6 glass-panel rounded-2xl relative overflow-hidden group">
          <div className="absolute -left-12 -bottom-12 w-24 h-24 bg-neon-blue/10 rounded-full blur-2xl group-hover:bg-neon-blue/15 transition-colors" />
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-neon-blue dark:text-neon-blue-light">
              <User className="w-5 h-5 text-glow-blue" />
              <h2 className="text-lg font-bold font-mono tracking-wide uppercase">About Me</h2>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              {developerInfo.about}
            </p>
          </div>
          <div className="mt-6 font-mono text-xs text-slate-500 border-t border-slate-200 dark:border-slate-900 pt-4">
            <span>{"// Focused on high-quality interfaces"}</span>
          </div>
        </div>

        {/* Mock Terminal Bio info */}
        <div className="lg:col-span-2 glass-panel rounded-2xl overflow-hidden flex flex-col border border-slate-200 dark:border-slate-900">
          {/* Terminal Title Bar */}
          <div className="w-full h-8 border-b border-slate-200 dark:border-slate-900 bg-slate-100/90 dark:bg-slate-950/80 px-4 flex items-center justify-between">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Prazz ~ bio.sh</span>
            <div className="w-6" /> {/* Spacer */}
          </div>
          
          {/* Terminal Body */}
          <div className="flex-1 p-5 font-mono text-xs md:text-sm text-slate-700 dark:text-slate-400 space-y-4 bg-slate-50/70 dark:bg-slate-950/30">
            <div>
              <span className="text-neon-blue">&gt;</span> <span className="text-slate-800 dark:text-slate-100 font-semibold">developer_profile.json</span>
            </div>
            <div className="text-slate-700 dark:text-slate-300 pl-4 space-y-1">
              <p>&#123;</p>
              <p className="pl-4">{"\"name\":"} <span className="text-neon-purple dark:text-neon-purple-light">{"\""}{"Prasetia Wahyu Ramadhan"}{"\""}</span>,</p>
              <p className="pl-4">{"\"role\":"} <span className="text-neon-purple dark:text-neon-purple-light">{"\"Full Stack Web Developer\""}</span>,</p>
              <p className="pl-4">{"\"stack\":"} [<span className="text-emerald-600 dark:text-emerald-400">{"\"Next.js\""}</span>, <span className="text-emerald-600 dark:text-emerald-400">{"\"TypeScript\""}</span>, <span className="text-emerald-600 dark:text-emerald-400">{"\"TailwindCSS\""}</span>],</p>
              <p className="pl-4">{"\"philosophy\":"} <span className="text-neon-blue dark:text-neon-blue-light">{"\"Design with passion, write clean, robust logic.\""}</span></p>
              <p>&#125;</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-neon-blue">&gt;</span>
              <span className="animate-pulse w-2 h-4 bg-neon-blue inline-block" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Experience & Education Timelines */}
      <motion.section variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Experience Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950/50 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
              <Briefcase className="w-5 h-5 text-neon-blue dark:text-neon-blue-light" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-wide">Work Experience</h2>
          </div>
          <Timeline items={mappedExperiences} type="experience" />
        </div>

        {/* Education Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950/50 border border-purple-500/20 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
              <GraduationCap className="w-5 h-5 text-neon-purple dark:text-neon-purple-light" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-wide">Education & Learning</h2>
          </div>
          <Timeline items={mappedEducation} type="education" />
        </div>
      </motion.section>

      {/* Skills Showcase Section */}
      <motion.section variants={fadeInUp} className="space-y-8 border-t border-slate-200 dark:border-slate-900/60 pt-14">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <Code2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-wide">Technical Skills</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Frontend Category */}
          <div className="glass-panel rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold font-mono tracking-wider text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-900 pb-2">
              Frontend Development
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {frontendSkills.map((skill) => (
                <SkillBadge key={skill.name} name={skill.name} category={skill.category} />
              ))}
            </div>
          </div>

          {/* Backend Category */}
          <div className="glass-panel rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold font-mono tracking-wider text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-900 pb-2">
              Backend & Architecture
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {backendSkills.map((skill) => (
                <SkillBadge key={skill.name} name={skill.name} category={skill.category} />
              ))}
            </div>
          </div>

          {/* Tools Category */}
          <div className="glass-panel rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold font-mono tracking-wider text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-900 pb-2">
              Engineering Tools
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {toolSkills.map((skill) => (
                <SkillBadge key={skill.name} name={skill.name} category={skill.category} />
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
