import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'इंस्टाग्राम कंटेंट जनरेटर | हिंदी में कैप्शन, बायो और हैशटैग बनाएं',
  description: 'AI की मदद से बनाएं आकर्षक इंस्टाग्राम कैप्शन, बायो और हैशटैग। हिंदी में मुफ्त टूल्स का इस्तेमाल करें।',
  openGraph: {
    title: 'इंस्टाग्राम कंटेंट जनरेटर | हिंदी में कैप्शन, बायो और हैशटैग बनाएं',
    description: 'AI की मदद से बनाएं आकर्षक इंस्टाग्राम कैप्शन, बायो और हैशटैग। हिंदी में मुफ्त टूल्स का इस्तेमाल करें।',
  },
};

export default function HindiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}