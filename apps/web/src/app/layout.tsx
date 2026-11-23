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
      <body className="min-h-screen flex flex-col antialiased selection:bg-primary/20 selection:text-primary relative bg-bg text-text">
        {/* Global Ambient Cosmic Background */}
        <div className="fixed inset-0 pointer-events-none -z-50 overflow-hidden" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(147,51,234,0.08),transparent_70%)]" />
          <div className="absolute top-[40%] -right-40 w-96 h-96 bg-[radial-gradient(circle,rgba(56,189,248,0.04),transparent_70%)]" />
          <div className="absolute bottom-[20%] -left-40 w-96 h-96 bg-[radial-gradient(circle,rgba(168,85,247,0.05),transparent_70%)]" />
        </div>
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
