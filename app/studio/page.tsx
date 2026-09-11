import type { Metadata } from 'next';
import StudioContent from '@/components/studio/StudioContent';

export const metadata: Metadata = {
  title: 'Studio Control Center',
  description: 'Private Portfolio Management System',
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudioPage() {
  return <StudioContent />;
}
