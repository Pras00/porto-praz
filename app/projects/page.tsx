import type { Metadata } from 'next';
import ProjectsContent from '@/components/ProjectsContent';

export const metadata: Metadata = {
  title: "Projects Showcase | Alex Rivera | Next.js Developer Portfolio",
  description: "Browse the developer project portfolio of Alex Rivera. Featuring full-stack web applications, frontend interactive dashboards, and backend microservices built in React and Node.js.",
  keywords: [
    "Web Developer Portfolio Projects",
    "Next.js Portfolio",
    "React Projects Grid",
    "Frontend Code Demos",
    "TypeScript Projects",
    "Developer Showcase"
  ],
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
