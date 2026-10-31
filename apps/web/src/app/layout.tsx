import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SkipLink } from '@/components/SkipLink';
import { CookieBanner } from '@ps/ui';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://pinnaclestride.com'),
  title: {
    default: 'PinnacleStride — Product-Building Startup & Digital Solutions',
    template: '%s | PinnacleStride',
  },
  description:
    'A product-building technology startup that also delivers custom digital solutions to businesses. Fast, elegant, accessible web applications and AI systems.',
  keywords: [
    'PinnacleStride',
    'Custom Digital Solutions',
    'Full-Stack Web Development',
    'AI Solutions',
    'GenAI & Agentic AI',
    'Next.js',
    'NestJS',
    'TypeScript',
  ],
  authors: [{ name: 'PinnacleStride Team' }],
  openGraph: {
    title: 'PinnacleStride — Build Beyond. Stride Ahead.',
    description:
      'We turn bold ideas into powerful digital solutions. From accessible business websites to full-stack applications and agentic AI.',
    url: 'https://pinnaclestride.com',
    siteName: 'PinnacleStride',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PinnacleStride — Build Beyond. Stride Ahead.',
    description:
      'Product-building technology startup delivering custom digital solutions with honest scoping and transparent engineering.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased selection:bg-[#2DD4BF] selection:text-[#0A1128]">
        <SkipLink />
        <Header />
        <main id="main-content" className="flex-1 w-full">
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
