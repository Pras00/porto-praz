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
  description: string[];
}

export interface Skill {
  name: string;
  level: number; // 0-100 for visual bars if needed
  category: 'frontend' | 'backend' | 'tools';
}

export interface DeveloperInfo {
  name: string;
  title: string;
  tagline: string;
  subTagline: string;
  about: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
}

export const developerInfo: DeveloperInfo = {
  name: "Prazz",
  title: "Creative Web Developer",
  tagline: "Crafting Modern Web Experiences",
  subTagline:
    "Building high-performance, visually stunning, and highly interactive interfaces using Next.js, TypeScript, and modern design principles.",
  about:
    "Informatics graduate with hands-on experience in front-end development through MSIB programs and software engineering projects. Proficient in building responsive web interfaces using HTML, CSS, JavaScript, React.js, Next.js, and Tailwind CSS. Experienced in translating design concepts into functional landing pages, collaborating with Digital Marketing teams, and applying basic SEO practices. Currently seeking a Web Developer Internship to contribute to the development of user-centered web products.",
  email: "prasetiawahyu22@gmail.com",
  github: "https://github.com/Pras00",
  linkedin: "https://www.linkedin.com/in/prasetia-wahyu-ramadhan-188919220/",
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
    role: "Front-End Developer",
    company: "PT Arkatama Multi Solusindo",
    period: "Feb 2024 - Jun 2024",
    description: [
      "Developed and implemented six responsive web pages using HTML, CSS, and JavaScript.",
      "Translated design concepts into landing pages, hero sections, JV pages, and download pages.",
      "Contributed to the development of web pages for the Lead Magnet, FitMeal E-book, and Spookids projects.",
      "Collaborated with the Digital Marketing team to deliver functional, engaging, and user-focused websites.",
      "Applied basic SEO practices to the structure and content of web pages."
    ],
  },
];

export const educationList: Education[] = [
  {
    id: "edu-1",
    degree: "Bachelor of Informatics",
    school: "Universitas Jember",
    period: "2021 - 2026",
    description: [
      "Completed a Bachelor’s degree in Informatics with a focus on software development and web technologies.",
      "Participated in HMIF committee activities and competitions in Web Development, UI/UX Design, and scientific writing.",
      "Strengthened collaboration, problem-solving, communication, and technical skills through academic projects and organizational activities.",
      "Specialized in Software Engineering and Human-Computer Interaction.",
      "Graduated with Honors (GPA 3.85/4.00).",
    ],
  },
  {
    id: "edu-2",
    degree: "MSIB Data & Software Engineering",
    school: "PT Revolusi Cita Edukasi (RevoU)",
    period: "Aug 2023 - Dec 2023",
    description: [
      "Applied Python, MySQL, exploratory data analysis, HTML, CSS, JavaScript, Node.js, REST API, and Prisma ORM through a capstone project.",
      "Collaborated with a five-person team to plan, develop, and present the capstone project.",
      "Achieved 1st place among 30 teams in a Data Analyst and Software Engineering project competition.",
      "Participated in Career Development activities to strengthen professional and career-readiness skills.",
    ],
  },
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
