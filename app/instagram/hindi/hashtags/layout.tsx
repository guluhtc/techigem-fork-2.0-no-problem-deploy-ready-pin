import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'हिंदी हैशटैग जनरेटर | इंस्टाग्राम के लिए ट्रेंडिंग हैशटैग बनाएं',
  description: 'AI की मदद से सेकंड्स में ट्रेंडिंग हिंदी हैशटैग बनाएं। मुफ्त में हैशटैग जनरेट करें और अपनी इंस्टाग्राम पोस्ट की रीच बढ़ाएं।',
  alternates: {
    languages: {
      'en': '/instagram/hashtags',
      'hi': '/instagram/hindi/hashtags',
    },
  },
  openGraph: {
    title: 'हिंदी हैशटैग जनरेटर | इंस्टाग्राम के लिए ट्रेंडिंग हैशटैग बनाएं',
    description: 'AI की मदद से सेकंड्स में ट्रेंडिंग हिंदी हैशटैग बनाएं। मुफ्त में हैशटैग जनरेट करें और अपनी इंस्टाग्राम पोस्ट की रीच बढ़ाएं।',
  },
};

export default function HindiHashtagsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}