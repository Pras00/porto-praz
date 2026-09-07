'use client';

import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Mail, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { developerInfo } from '@/data/portfolioData';
import { useContactStore } from '@/store/useContactStore';

// Custom SVG Icons because Lucide v0.400+ removed them
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

// Framer Motion entry animations
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

export default function ContactContent() {
  const {
    name,
    email,
    message,
    status,
    errors,
    setName,
    setEmail,
    setMessage,
    submitForm,
    resetForm,
  } = useContactStore();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitForm();
  };

  const contactInfos = [
    {
      name: 'Email Address',
      value: developerInfo.email,
      href: `mailto:${developerInfo.email}`,
      icon: Mail,
      accent: 'text-blue-600 dark:text-blue-400 border-blue-500/20 bg-blue-500/10 dark:bg-blue-950/20 hover:border-blue-500/40 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]',
    },
    {
      name: 'GitHub Profile',
      value: 'https://github.com/Pras00',
      href: developerInfo.github,
      icon: GithubIcon,
      accent: 'text-purple-600 dark:text-purple-400 border-purple-500/20 bg-purple-500/10 dark:bg-purple-950/20 hover:border-purple-500/40 hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]',
    },
    {
      name: 'LinkedIn Network',
      value: 'https://www.linkedin.com/in/prasetia-wahyu-ramadhan-188919220/',
      href: developerInfo.linkedin,
      icon: LinkedinIcon,
      accent: 'text-emerald-600 dark:text-emerald-400 border-emerald-500/20 bg-emerald-500/10 dark:bg-emerald-950/20 hover:border-emerald-500/40 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]',
    },
  ];

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
          {"Let's "}{' '}
          <span className="bg-linear-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent text-glow-dual">
            Connect
          </span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-lg">
          Got a project in mind, want to collaborate, or just say hello? Drop a message below!
        </p>
      </motion.div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        {/* Left Hand: Contact Information Cards */}
        <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold font-mono tracking-wider text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-900 pb-2 mb-6">
            Contact Details
          </h2>

          <div className="space-y-4">
            {contactInfos.map((info) => {
              const Icon = info.icon;
              return (
                <a
                  key={info.name}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${info.accent}`}
                >
                  <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <Icon className="w-5 h-5 shrink-0" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      {info.name}
                    </span>
                    <span className="block text-sm font-semibold truncate text-slate-800 dark:text-slate-200 mt-0.5">
                      {info.value}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="glass-panel rounded-2xl p-5 border border-slate-200 dark:border-slate-900 bg-white/50 dark:bg-slate-950/20 text-xs text-slate-600 dark:text-slate-500 leading-relaxed font-mono">
            <span className="text-neon-blue dark:text-neon-blue-light font-bold block mb-2">{"// WORKING HOURS"}</span>
            <p>Monday - Friday: 09:00 - 18:00 (GMT+7)</p>
            <p className="mt-1">Response time: Typically within 24 hours</p>
          </div>
        </motion.div>

        {/* Right Hand: Contact Form */}
        <motion.div variants={fadeInUp} className="lg:col-span-3">
          <h2 className="text-lg font-bold font-mono tracking-wider text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-900 pb-2 mb-6">
            Send Message
          </h2>

          <div className="glass-panel rounded-2xl p-6 md:p-8 relative overflow-hidden">
            {/* Top right ambient blob decoration */}
            <div className="absolute -right-12 -top-12 w-28 h-28 bg-neon-purple/5 rounded-full blur-2xl pointer-events-none" />

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                /* Success Message State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle2 className="w-16 h-16 text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)] mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Message Sent Successfully!</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm max-w-sm leading-relaxed mb-8">
                    Thank you for reaching out. Your message has been received. I will get back to you shortly!
                  </p>
                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 text-xs font-mono font-bold text-neon-blue border border-neon-blue/40 rounded-lg hover:bg-neon-blue/10 hover:border-neon-blue hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                /* Standard Interactive Form State */
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleFormSubmit}
                  className="space-y-6"
                  noValidate
                >
                  {/* Name field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      disabled={status === 'submitting'}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-950/60 border text-slate-900 dark:text-slate-200 text-sm font-sans focus:outline-none transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-600 ${
                        errors.name
                          ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                          : 'border-slate-300 dark:border-slate-800 focus:border-neon-blue focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs font-mono flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      disabled={status === 'submitting'}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-950/60 border text-slate-900 dark:text-slate-200 text-sm font-sans focus:outline-none transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-600 ${
                        errors.email
                          ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                          : 'border-slate-300 dark:border-slate-800 focus:border-neon-blue focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs font-mono flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Message field */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={message}
                      disabled={status === 'submitting'}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your project, ideas, or questions here..."
                      className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-950/60 border text-slate-900 dark:text-slate-200 text-sm font-sans focus:outline-none transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-none ${
                        errors.message
                          ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                          : 'border-slate-300 dark:border-slate-800 focus:border-neon-blue focus:shadow-[0_0_15px_rgba(59,130,246,0.25)]'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-red-400 text-xs font-mono flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Global error feedback */}
                  {status === 'error' && (
                    <div className="p-3 rounded-lg border border-red-500/20 bg-red-950/20 text-red-400 text-xs font-mono flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>An error occurred while sending your message. Please try again.</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-mono font-semibold text-white transition-all duration-300 cursor-pointer ${
                      status === 'submitting'
                        ? 'bg-slate-800 border border-slate-700 text-slate-500 cursor-not-allowed'
                        : 'bg-linear-to-r from-neon-blue to-neon-purple hover:brightness-110 shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_25px_rgba(139,92,246,0.35)] hover:scale-[1.01]'
                    }`}
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
