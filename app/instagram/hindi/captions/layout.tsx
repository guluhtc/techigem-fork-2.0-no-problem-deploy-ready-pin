import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'हिंदी कैप्शन जनरेटर | इंस्टाग्राम के लिए आकर्षक कैप्शन बनाएं',
  description: 'AI की मदद से सेकंड्स में आकर्षक हिंदी कैप्शन बनाएं। मुफ्त में कैप्शन जनरेट करें और अपनी इंस्टाग्राम पोस्ट को बनाएं वायरल।',
  alternates: {
    languages: {
      'en': '/instagram/captions',
      'hi': '/instagram/hindi/captions',
    },
  },
  openGraph: {
    title: 'हिंदी कैप्शन जनरेटर | इंस्टाग्राम के लिए आकर्षक कैप्शन बनाएं',
    description: 'AI की मदद से सेकंड्स में आकर्षक हिंदी कैप्शन बनाएं। मुफ्त में कैप्शन जनरेट करें और अपनी इंस्टाग्राम पोस्ट को बनाएं वायरल।',
  },
};

export default function HindiCaptionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}