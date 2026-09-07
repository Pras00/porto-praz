export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: 'frontend' | 'backend' | 'fullstack';
  image: string; // Will use CSS gradients and styling to present them gorgeously
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  period: string;
  description: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100 for visual bars if needed
  category: 'frontend' | 'backend' | 'tools';
}

export const developerInfo = {
  name: "Prazz",
  title: "Creative Web Developer",
  tagline: "Crafting Modern Web Experiences",
  subTagline: "Building high-performance, visually stunning, and highly interactive interfaces using Next.js, TypeScript, and modern design principles.",
  about: "I am a passionate Web Developer with a strong focus on frontend experiences, clean code architectures, and modern web aesthetics. I bridge the gap between complex engineering and elegant design to build products that feel intuitive and responsive. When I'm not coding, I'm exploring new animation techniques, designing interactive prototypes, or optimizing application performance.",
  email: "prasetiawahyu22@gmail.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
};

export const skills: Skill[] = [
  // Frontend
  { name: "React / Next.js", level: 95, category: "frontend" },
  { name: "TypeScript", level: 90, category: "frontend" },
  { name: "JavaScript", level: 95, category: "frontend" },
  { name: "Tailwind CSS", level: 98, category: "frontend" },
  { name: "Framer Motion", level: 85, category: "frontend" },
  { name: "HTML5 & CSS3", level: 95, category: "frontend" },
  
  // Backend
  { name: "Node.js", level: 88, category: "backend" },
  { name: "Express / NestJS", level: 80, category: "backend" },
  { name: "PostgreSQL", level: 85, category: "backend" },
  { name: "Prisma ORM", level: 88, category: "backend" },
  { name: "REST & GraphQL", level: 90, category: "backend" },
  
  // Tools
  { name: "Git & GitHub", level: 92, category: "tools" },
  { name: "Docker", level: 75, category: "tools" },
  { name: "Figma", level: 80, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" },
  { name: "Vercel / Netlify", level: 90, category: "tools" }
];

export const experiences: Experience[] = [
  {
    id: "exp-1",
    role: "Senior Frontend Engineer",
    company: "CyberSpace Labs",
    period: "2024 - Present",
    description: [
      "Architected and developed next-generation Web3 analytics dashboards using Next.js (App Router) and Tailwind CSS.",
      "Optimized client-side navigation and rendering performance, resulting in a 45% increase in Core Web Vitals scores.",
      "Established standard reusable UI component library integrated with Framer Motion animations across 4 engineering teams.",
      "Mentored junior developers and introduced modern testing practices using Jest and React Testing Library."
    ]
  },
  {
    id: "exp-2",
    role: "Full-Stack Developer",
    company: "NexaCore Solutions",
    period: "2022 - 2024",
    description: [
      "Built and scaled multi-tenant SaaS applications, integrating Stripe payment gateway and authentication flows.",
      "Designed robust backend APIs in Node.js/TypeScript using NestJS and Prisma, handling 50k+ daily active requests.",
      "Migrated legacy monolithic systems to modular serverless APIs deployed on AWS and Vercel.",
      "Collaborated closely with designers to implement custom tailwind-based interactive dashboards."
    ]
  },
  {
    id: "exp-3",
    role: "Web Developer Intern",
    company: "Vertex Digital Agency",
    period: "2021 - 2022",
    description: [
      "Developed SEO-optimized marketing sites and high-converting landing pages for various international clients.",
      "Translated complex static design mockups from Figma into pixel-perfect responsive HTML, CSS, and React code.",
      "Maintained and updated customer portals, resolving UI/UX bugs and browser compatibility issues."
    ]
  }
];

export const educationList: Education[] = [
  {
    id: "edu-1",
    degree: "Bachelor of Science in Computer Science",
    school: "State University",
    period: "2018 - 2022",
    description: "Specialized in Software Engineering and Human-Computer Interaction. Graduated with Honors (GPA 3.85/4.00)."
  },
  {
    id: "edu-2",
    degree: "Full-Stack Web Development Immersion",
    school: "Tech Academy Bootcamp",
    period: "2022",
    description: "An intensive 6-month developer training program focused on JavaScript, React, Node.js, databases, and system design."
  }
];

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "Aetherial Dashboard",
    description: "A futuristic real-time Web3 monitoring dashboard with glassmorphism, responsive live widgets, and advanced crypto charts.",
    longDescription: "Aetherial is a fully interactive financial control panel featuring real-time data feeds, customizable widget grids, and glowing card components. Built to showcase extreme glassmorphic rendering, web socket connections, and deep Framer Motion integrations.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Recharts"],
    category: "frontend",
    image: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)", // custom visual gradient
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com",
    featured: true
  },
  {
    id: "proj-2",
    title: "Nova Commerce",
    description: "A headless, high-performance e-commerce engine with modular state management, custom filters, and full Stripe integration.",
    longDescription: "Nova Commerce features instant catalog searches, optimized image delivery, and a highly responsive custom cart powered by Zustand. Integrated with an admin billing console and Stripe's webhooks for checkout flows.",
    technologies: ["Next.js", "Zustand", "Tailwind CSS", "Stripe API", "PostgreSQL"],
    category: "fullstack",
    image: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com",
    featured: true
  },
  {
    id: "proj-3",
    title: "Synapse Notes",
    description: "A markdown-focused note-taking editor displaying notes as a node-link network, utilizing local storage and custom themes.",
    longDescription: "Synapse lets users edit local markdown notes side-by-side with an interactive graph showing connecting concepts. Highly styled with neon borders that react to editor focus.",
    technologies: ["React", "TypeScript", "Zustand", "Tailwind CSS", "VisJS"],
    category: "frontend",
    image: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com",
    featured: false
  },
  {
    id: "proj-4",
    title: "Helix API Gateway",
    description: "A lightweight, secure, and fast reverse-proxy gateway with dynamic rate limiting and Redis request caching.",
    longDescription: "Helix protects downstream microservices with a configurable middleware layer. Includes request logging, rate limiting (via token bucket), and rapid response caching built entirely in async TypeScript.",
    technologies: ["Node.js", "TypeScript", "Redis", "Docker", "Express"],
    category: "backend",
    image: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com",
    featured: false
  }
];
