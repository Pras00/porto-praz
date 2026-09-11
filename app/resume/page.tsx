import type { Metadata } from 'next';
import ResumeContent from '@/components/ResumeContent';

export const metadata: Metadata = {
  title: "Resume & Skills | Prazz | Creative Web Developer",
  description: "Review the professional experience, education, and technical skills of Prazz (Prasetia Wahyu Ramadhan). Specializing in React, Next.js, TypeScript, and modern web engineering.",
  keywords: [
    "Prazz Resume",
    "Prasetia Wahyu Ramadhan CV",
    "Web Developer Resume",
    "Next.js Developer Experience",
    "Frontend Developer Skills",
    "Informatics Graduate",
  ],
};

export default function ResumePage() {
  return <ResumeContent />;
}
