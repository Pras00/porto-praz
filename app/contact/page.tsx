import type { Metadata } from 'next';
import ContactContent from '@/components/ContactContent';

export const metadata: Metadata = {
  title: "Contact Alex Rivera | Professional Web Developer Collaboration",
  description: "Send a message to Alex Rivera. Available for Web Development, Frontend Consulting, and Next.js collaborations. Get in touch via email, GitHub, or LinkedIn.",
  keywords: [
    "Contact Web Developer",
    "Hire Next.js Developer",
    "Contact Frontend Engineer",
    "Alex Rivera Contact Form",
    "Hire React Developer"
  ],
};

export default function ContactPage() {
  return <ContactContent />;
}
