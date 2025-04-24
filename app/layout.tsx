import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  metadataBase: new URL('https://techigem.com'),
  title: 'Techigem - AI Instagram Management Platform',
  description: 'AI-powered Instagram content scheduler and manager for creators and businesses',
  openGraph: {
    title: 'Techigem - AI Instagram Management Platform',
    description: 'AI-powered Instagram content scheduler and manager for creators and businesses',
    type: 'website',
    locale: 'en_US',
    url: 'https://techigem.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Techigem - AI Instagram Management Platform',
    description: 'AI-powered Instagram content scheduler and manager for creators and businesses',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  );
}