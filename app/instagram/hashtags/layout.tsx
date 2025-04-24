import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Instagram Hashtags Generator tool (Viral & Trending)',
  description: 'Generate viral and trending Instagram hashtags in seconds with our free AI-powered tool. Increase your reach and engagement.',
  alternates: {
    languages: {
      'en': '/instagram/hashtags',
      'hi': '/instagram/hindi/hashtags',
    },
  },
  openGraph: {
    title: 'Free Instagram Hashtags Generator tool (Viral & Trending)',
    description: 'Generate viral and trending Instagram hashtags in seconds with our free AI-powered tool. Increase your reach and engagement.',
  },
}

export default function HashtagsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}