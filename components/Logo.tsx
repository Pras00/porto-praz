'use client';

import React from 'react';

interface LogoProps {
  /** Size in pixels (number) or preset string ('sm' | 'md' | 'lg' | 'xl') */
  size?: number | 'sm' | 'md' | 'lg' | 'xl';
  /** Show the rounded squircle badge container */
  showBadge?: boolean;
  /** Display brand name 'Prazz()' beside the mark */
  showText?: boolean;
  /** Subtitle text under brand name */
  subtitle?: string;
  /** Optional extra styling on the root container */
  className?: string;
  /** Enable hover glow & scale animation */
  interactive?: boolean;
}

const sizeMap = {
  sm: 28,
  md: 38,
  lg: 52,
  xl: 68,
};

export default function Logo({
  size = 'md',
  showBadge = true,
  showText = false,
  subtitle,
  className = '',
  interactive = true,
}: LogoProps) {
  const pixelSize = typeof size === 'number' ? size : sizeMap[size] || 38;

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <div
        className={`relative flex items-center justify-center shrink-0 transition-transform duration-300 ${
          interactive ? 'group-hover:scale-105' : ''
        }`}
        style={{ width: pixelSize, height: pixelSize }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_12px_rgba(59,130,246,0.35)] transition-all duration-300 group-hover:drop-shadow-[0_0_18px_rgba(139,92,246,0.5)]"
        >
          <defs>
            {/* Neon Cyan to Blue Linear Gradient */}
            <linearGradient id="prazz-logo-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f2fe" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>

            {/* Neon Purple to Magenta Linear Gradient */}
            <linearGradient id="prazz-logo-purple" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>

            {/* Badge Border Gradient */}
            <linearGradient id="prazz-logo-border" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
            </linearGradient>

            {/* Dark Cyber Background Gradient */}
            <linearGradient id="prazz-logo-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0d1527" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#050811" stopOpacity="0.98" />
            </linearGradient>
          </defs>

          {/* Squircle Badge Container */}
          {showBadge && (
            <rect
              x="3"
              y="3"
              width="94"
              height="94"
              rx="24"
              fill="url(#prazz-logo-bg)"
              stroke="url(#prazz-logo-border)"
              strokeWidth="2.5"
              className="transition-colors duration-300"
            />
          )}

          {/* Core Prazz Monogram: Letter 'P' Interlocked with '< / >' Code Symbols */}
          <g id="prazz-monogram">
            {/* Left Bracket < */}
            <path
              d="M 34 22 L 18 39 L 34 56"
              stroke="url(#prazz-logo-cyan)"
              strokeWidth="7.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Vertical Stem of P */}
            <path
              d="M 18 39 L 18 78"
              stroke="url(#prazz-logo-cyan)"
              strokeWidth="7.5"
              strokeLinecap="round"
            />

            {/* Top Bar connecting to Right Bracket */}
            <path
              d="M 34 22 L 58 22"
              stroke="url(#prazz-logo-cyan)"
              strokeWidth="7.5"
              strokeLinecap="round"
            />

            {/* Right Bracket > completing the Loop of P */}
            <path
              d="M 58 22 L 82 39 L 58 56"
              stroke="url(#prazz-logo-purple)"
              strokeWidth="7.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Bottom Loop Return Bar */}
            <path
              d="M 58 56 L 34 56"
              stroke="url(#prazz-logo-purple)"
              strokeWidth="7.5"
              strokeLinecap="round"
            />

            {/* Center Code Slash / */}
            <path
              d="M 42 50 L 50 28"
              stroke="#00f2fe"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Terminal Pulse Line & Dot Accent */}
            <path
              d="M 52 74 L 62 74"
              stroke="#a855f7"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="70" cy="74" r="3.5" fill="#a855f7" />
          </g>
        </svg>
      </div>

      {/* Optional Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <span className="font-mono text-lg font-bold tracking-tight bg-linear-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent group-hover:brightness-110 transition-all duration-300">
            Prazz()
          </span>
          {subtitle && (
            <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase -mt-0.5">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
