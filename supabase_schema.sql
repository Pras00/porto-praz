-- =========================================================
-- SUPABASE SCHEMA & INITIAL DATA FOR PORTOFOLIO DASHBOARD
-- =========================================================
-- Copy and paste this script into your Supabase SQL Editor and click RUN.

-- 1. Table: portfolio_profile
CREATE TABLE IF NOT EXISTS public.portfolio_profile (
    id TEXT PRIMARY KEY DEFAULT 'main',
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    tagline TEXT NOT NULL,
    sub_tagline TEXT,
    about TEXT,
    email TEXT,
    github TEXT,
    linkedin TEXT,
    twitter TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Table: portfolio_projects
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    technologies TEXT[] DEFAULT '{}',
    category TEXT NOT NULL CHECK (category IN ('frontend', 'backend', 'fullstack')),
    image TEXT DEFAULT '',
    demo_url TEXT DEFAULT '',
    github_url TEXT DEFAULT '',
    featured BOOLEAN DEFAULT false,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Table: portfolio_experiences
CREATE TABLE IF NOT EXISTS public.portfolio_experiences (
    id TEXT PRIMARY KEY,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    period TEXT NOT NULL,
    description TEXT[] DEFAULT '{}',
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. Table: portfolio_education
CREATE TABLE IF NOT EXISTS public.portfolio_education (
    id TEXT PRIMARY KEY,
    degree TEXT NOT NULL,
    school TEXT NOT NULL,
    period TEXT NOT NULL,
    description TEXT[] DEFAULT '{}',
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. Table: portfolio_skills
CREATE TABLE IF NOT EXISTS public.portfolio_skills (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    level INTEGER DEFAULT 80,
    category TEXT NOT NULL CHECK (category IN ('frontend', 'backend', 'tools')),
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.portfolio_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_skills ENABLE ROW LEVEL SECURITY;

-- Allow public read access to everyone
CREATE POLICY "Public profiles are viewable by everyone." ON public.portfolio_profile FOR SELECT USING (true);
CREATE POLICY "Public projects are viewable by everyone." ON public.portfolio_projects FOR SELECT USING (true);
CREATE POLICY "Public experiences are viewable by everyone." ON public.portfolio_experiences FOR SELECT USING (true);
CREATE POLICY "Public education are viewable by everyone." ON public.portfolio_education FOR SELECT USING (true);
CREATE POLICY "Public skills are viewable by everyone." ON public.portfolio_skills FOR SELECT USING (true);

-- Allow full access for anon/authenticated (with PIN control at application level)
CREATE POLICY "Allow anon insert portfolio_profile" ON public.portfolio_profile FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon update portfolio_profile" ON public.portfolio_profile FOR UPDATE USING (true);
CREATE POLICY "Allow anon delete portfolio_profile" ON public.portfolio_profile FOR DELETE USING (true);

CREATE POLICY "Allow anon insert portfolio_projects" ON public.portfolio_projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon update portfolio_projects" ON public.portfolio_projects FOR UPDATE USING (true);
CREATE POLICY "Allow anon delete portfolio_projects" ON public.portfolio_projects FOR DELETE USING (true);

CREATE POLICY "Allow anon insert portfolio_experiences" ON public.portfolio_experiences FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon update portfolio_experiences" ON public.portfolio_experiences FOR UPDATE USING (true);
CREATE POLICY "Allow anon delete portfolio_experiences" ON public.portfolio_experiences FOR DELETE USING (true);

CREATE POLICY "Allow anon insert portfolio_education" ON public.portfolio_education FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon update portfolio_education" ON public.portfolio_education FOR UPDATE USING (true);
CREATE POLICY "Allow anon delete portfolio_education" ON public.portfolio_education FOR DELETE USING (true);

CREATE POLICY "Allow anon insert portfolio_skills" ON public.portfolio_skills FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon update portfolio_skills" ON public.portfolio_skills FOR UPDATE USING (true);
CREATE POLICY "Allow anon delete portfolio_skills" ON public.portfolio_skills FOR DELETE USING (true);

-- =========================================================
-- INITIAL SEED DATA (from portfolioData.ts)
-- =========================================================

-- Seed Profile
INSERT INTO public.portfolio_profile (id, name, title, tagline, sub_tagline, about, email, github, linkedin, twitter)
VALUES (
    'main',
    'Prazz',
    'Creative Web Developer',
    'Crafting Modern Web Experiences',
    'Building high-performance, visually stunning, and highly interactive interfaces using Next.js, TypeScript, and modern design principles.',
    'Informatics graduate with hands-on experience in front-end development through MSIB programs and software engineering projects. Proficient in building responsive web interfaces using HTML, CSS, JavaScript, React.js, Next.js, and Tailwind CSS. Experienced in translating design concepts into functional landing pages, collaborating with Digital Marketing teams, and applying basic SEO practices. Currently seeking a Web Developer Internship to contribute to the development of user-centered web products.',
    'prasetiawahyu22@gmail.com',
    'https://github.com/Pras00',
    'https://www.linkedin.com/in/prasetia-wahyu-ramadhan-188919220/',
    'https://twitter.com'
) ON CONFLICT (id) DO NOTHING;

-- Seed Projects
INSERT INTO public.portfolio_projects (id, title, description, long_description, technologies, category, image, demo_url, github_url, featured, order_index)
VALUES
(
    'proj-1',
    'Aetherial Dashboard',
    'A futuristic real-time Web3 monitoring dashboard with glassmorphism, responsive live widgets, and advanced crypto charts.',
    'Aetherial is a fully interactive financial control panel featuring real-time data feeds, customizable widget grids, and glowing card components. Built to showcase extreme glassmorphic rendering, web socket connections, and deep Framer Motion integrations.',
    ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Recharts'],
    'frontend',
    'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    'https://demo.example.com',
    'https://github.com',
    true,
    1
),
(
    'proj-2',
    'Nova Commerce',
    'A headless, high-performance e-commerce engine with modular state management, custom filters, and full Stripe integration.',
    'Nova Commerce features instant catalog searches, optimized image delivery, and a highly responsive custom cart powered by Zustand. Integrated with an admin billing console and Stripe''s webhooks for checkout flows.',
    ARRAY['Next.js', 'Zustand', 'Tailwind CSS', 'Stripe API', 'PostgreSQL'],
    'fullstack',
    'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    'https://demo.example.com',
    'https://github.com',
    true,
    2
),
(
    'proj-3',
    'Synapse Notes',
    'A markdown-focused note-taking editor displaying notes as a node-link network, utilizing local storage and custom themes.',
    'Synapse lets users edit local markdown notes side-by-side with an interactive graph showing connecting concepts. Highly styled with neon borders that react to editor focus.',
    ARRAY['React', 'TypeScript', 'Zustand', 'Tailwind CSS', 'VisJS'],
    'frontend',
    'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
    'https://demo.example.com',
    'https://github.com',
    false,
    3
),
(
    'proj-4',
    'Helix API Gateway',
    'A lightweight, secure, and fast reverse-proxy gateway with dynamic rate limiting and Redis request caching.',
    'Helix protects downstream microservices with a configurable middleware layer. Includes request logging, rate limiting (via token bucket), and rapid response caching built entirely in async TypeScript.',
    ARRAY['Node.js', 'TypeScript', 'Redis', 'Docker', 'Express'],
    'backend',
    'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    'https://demo.example.com',
    'https://github.com',
    false,
    4
)
ON CONFLICT (id) DO NOTHING;

-- Seed Experiences
INSERT INTO public.portfolio_experiences (id, role, company, period, description, order_index)
VALUES
(
    'exp-1',
    'Front-End Developer',
    'PT Arkatama Multi Solusindo',
    'Feb 2024 - Jun 2024',
    ARRAY[
        'Developed and implemented six responsive web pages using HTML, CSS, and JavaScript.',
        'Translated design concepts into landing pages, hero sections, JV pages, and download pages.',
        'Contributed to the development of web pages for the Lead Magnet, FitMeal E-book, and Spookids projects.',
        'Collaborated with the Digital Marketing team to deliver functional, engaging, and user-focused websites.',
        'Applied basic SEO practices to the structure and content of web pages.'
    ],
    1
)
ON CONFLICT (id) DO NOTHING;

-- Seed Education
INSERT INTO public.portfolio_education (id, degree, school, period, description, order_index)
VALUES
(
    'edu-1',
    'Bachelor of Informatics',
    'Universitas Jember',
    '2021 - 2026',
    ARRAY[
        'Completed a Bachelor’s degree in Informatics with a focus on software development and web technologies.',
        'Participated in HMIF committee activities and competitions in Web Development, UI/UX Design, and scientific writing.',
        'Strengthened collaboration, problem-solving, communication, and technical skills through academic projects and organizational activities.',
        'Specialized in Software Engineering and Human-Computer Interaction.',
        'Graduated with Honors (GPA 3.85/4.00).'
    ],
    1
),
(
    'edu-2',
    'MSIB Data & Software Engineering',
    'PT Revolusi Cita Edukasi (RevoU)',
    'Aug 2023 - Dec 2023',
    ARRAY[
        'Applied Python, MySQL, exploratory data analysis, HTML, CSS, JavaScript, Node.js, REST API, and Prisma ORM through a capstone project.',
        'Collaborated with a five-person team to plan, develop, and present the capstone project.',
        'Achieved 1st place among 30 teams in a Data Analyst and Software Engineering project competition.',
        'Participated in Career Development activities to strengthen professional and career-readiness skills.'
    ],
    2
)
ON CONFLICT (id) DO NOTHING;

-- Seed Skills
INSERT INTO public.portfolio_skills (id, name, level, category, order_index)
VALUES
('skill-1', 'React / Next.js', 95, 'frontend', 1),
('skill-2', 'TypeScript', 90, 'frontend', 2),
('skill-3', 'JavaScript', 95, 'frontend', 3),
('skill-4', 'Tailwind CSS', 98, 'frontend', 4),
('skill-5', 'Framer Motion', 85, 'frontend', 5),
('skill-6', 'HTML5 & CSS3', 95, 'frontend', 6),
('skill-7', 'Node.js', 88, 'backend', 7),
('skill-8', 'Express / NestJS', 80, 'backend', 8),
('skill-9', 'PostgreSQL', 85, 'backend', 9),
('skill-10', 'Prisma ORM', 88, 'backend', 10),
('skill-11', 'REST & GraphQL', 90, 'backend', 11),
('skill-12', 'Git & GitHub', 92, 'tools', 12),
('skill-13', 'Docker', 75, 'tools', 13),
('skill-14', 'Figma', 80, 'tools', 14),
('skill-15', 'VS Code', 95, 'tools', 15),
('skill-16', 'Vercel / Netlify', 90, 'tools', 16)
ON CONFLICT (id) DO NOTHING;
