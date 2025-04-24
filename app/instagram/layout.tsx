import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free AI Instagram Content Generator | Create Viral Content',
  description: 'Generate engaging Instagram captions, bios, and hashtags in seconds with our free AI-powered tools. Available in English & Hindi. No credit card required.',
  alternates: {
    languages: {
      'en': '/instagram',
      'hi': '/instagram/hindi',
    },
  },
  openGraph: {
    title: 'Free AI Instagram Content Generator | Create Viral Content',
    description: 'Generate engaging Instagram captions, bios, and hashtags in seconds with our free AI-powered tools. Available in English & Hindi. No credit card required.',
    type: 'website',
    url: 'https://techigem.com/instagram',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Instagram Content Generator | Create Viral Content',
    description: 'Generate engaging Instagram captions, bios, and hashtags in seconds with our free AI-powered tools. Available in English & Hindi. No credit card required.',
  },
  keywords: [
    'instagram content generator',
    'ai caption generator',
    'instagram bio generator',
    'instagram hashtag generator',
    'free instagram tools',
    'viral instagram content',
    'instagram marketing tools',
    'social media content generator'
  ],
}

export default function InstagramLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}