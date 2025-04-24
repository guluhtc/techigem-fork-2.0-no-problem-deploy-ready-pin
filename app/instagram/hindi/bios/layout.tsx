import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'हिंदी बायो जनरेटर | इंस्टाग्राम के लिए प्रोफेशनल बायो बनाएं',
  description: 'AI की मदद से सेकंड्स में प्रोफेशनल हिंदी बायो बनाएं। मुफ्त में बायो जनरेट करें और अपनी इंस्टाग्राम प्रोफाइल को बनाएं आकर्षक।',
  alternates: {
    languages: {
      'en': '/instagram/bios',
      'hi': '/instagram/hindi/bios',
    },
  },
  openGraph: {
    title: 'हिंदी बायो जनरेटर | इंस्टाग्राम के लिए प्रोफेशनल बायो बनाएं',
    description: 'AI की मदद से सेकंड्स में प्रोफेशनल हिंदी बायो बनाएं। मुफ्त में बायो जनरेट करें और अपनी इंस्टाग्राम प्रोफाइल को बनाएं आकर्षक।',
  },
};

export default function HindiBiosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}