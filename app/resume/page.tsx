import type { Metadata } from 'next';
import ResumeContent from '@/components/ResumeContent';

export const metadata: Metadata = {
  title: "Resume & Skills | Alex Rivera | Senior Frontend Developer",
  description: "Review the professional experience, history, and technologies of Alex Rivera. Specializing in Web Development, Next.js, Node.js, and modern tools.",
  keywords: [
    "Web Developer Resume",
    "Next.js Developer Experience",
    "Frontend Developer Skills",
    "Tech Stack Portfolio",
    "Alex Rivera CV"
  ],
};

export default function ResumePage() {
  return <ResumeContent />;
}
