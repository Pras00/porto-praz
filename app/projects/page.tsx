import type { Metadata } from 'next';
import ProjectsContent from '@/components/ProjectsContent';

export const metadata: Metadata = {
  title: "Projects Showcase | Prazz | Creative Web Developer",
  description: "Explore the creative portfolio projects of Prazz (Prasetia Wahyu Ramadhan). Featuring responsive web applications, modern frontends, and dynamic dashboards built with Next.js, React, and TypeScript.",
  keywords: [
    "Prazz Projects",
    "Prasetia Wahyu Ramadhan Portfolio",
    "Web Developer Portfolio Projects",
    "Next.js Portfolio",
    "React Projects Showcase",
    "Frontend Projects",
    "TypeScript Projects",
  ],
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
