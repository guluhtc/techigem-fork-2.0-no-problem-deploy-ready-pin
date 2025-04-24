import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Instagram Bios Generator tool (Viral & Trending)',
  description: 'Create professional and engaging Instagram bios in seconds with our free AI-powered tool. Stand out from the crowd.',
  alternates: {
    languages: {
      'en': '/instagram/bios',
      'hi': '/instagram/hindi/bios',
    },
  },
  openGraph: {
    title: 'Free Instagram Bios Generator tool (Viral & Trending)',
    description: 'Create professional and engaging Instagram bios in seconds with our free AI-powered tool. Stand out from the crowd.',
  },
}

export default function BiosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}