import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Instagram Captions Generator tool (Viral & Trending)',
  description: 'Generate viral and trending Instagram captions in seconds with our free AI-powered tool. Perfect for creators and businesses.',
  alternates: {
    languages: {
      'en': '/instagram/captions',
      'hi': '/instagram/hindi/captions',
    },
  },
  openGraph: {
    title: 'Free Instagram Captions Generator tool (Viral & Trending)',
    description: 'Generate viral and trending Instagram captions in seconds with our free AI-powered tool. Perfect for creators and businesses.',
  },
}

export default function CaptionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}