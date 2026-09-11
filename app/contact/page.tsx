import type { Metadata } from 'next';
import ContactContent from '@/components/ContactContent';

export const metadata: Metadata = {
  title: "Contact Me | Prazz | Creative Web Developer",
  description: "Send a message to Prazz (Prasetia Wahyu Ramadhan). Available for Web Development projects, Frontend engineering, and Next.js collaborations. Reach out via email, GitHub, or LinkedIn.",
  keywords: [
    "Contact Prazz",
    "Contact Prasetia Wahyu Ramadhan",
    "Contact Web Developer",
    "Hire Next.js Developer",
    "Hire Frontend Engineer",
    "Prazz Contact Form",
  ],
};

export default function ContactPage() {
  return <ContactContent />;
}
