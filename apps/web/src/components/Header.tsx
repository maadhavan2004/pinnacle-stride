'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo, Button, cn } from '@ps/ui';
import { ThemeToggle } from './ThemeToggle';
import { ChevronDown, Menu, X, ArrowRight, Layers, Cpu, Sparkles, Globe, Cloud } from 'lucide-react';

const serviceLinks = [
  {
    href: '/services/websites-business-solutions',
    title: 'Websites & Business Solutions',
    desc: 'High-conversion marketing engines & portals',
    icon: Globe,
  },
  {
    href: '/services/full-stack-development',
    title: 'Full-Stack Applications',
    desc: 'Type-safe modular web apps & operations backoffices',
    icon: Layers,
  },
  {
    href: '/services/ai-machine-learning',
    title: 'AI & Machine Learning',
    desc: 'Operational predictive models & inference pipelines',
    icon: Cpu,
  },
  {
    href: '/services/genai-agentic-ai',
    title: 'Generative AI & Agentic AI',
    desc: 'Grounded RAG assistants & autonomous agent workflows',
    icon: Sparkles,
  },
  {
    href: '/services/cloud-deployment-integrations',
    title: 'Cloud & Integrations',
    desc: 'Container topology, automatic TLS & telemetry',
    icon: Cloud,
  },
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/products', label: 'Products' },
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
    { href: '/how-we-work', label: 'How We Work' },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-200 border-b',
        isScrolled
          ? 'bg-white/90 dark:bg-[#0A1128]/90 backdrop-blur-md border-[#D8E0EE] dark:border-[#22305A] py-3 shadow-sm'
          : 'bg-transparent border-transparent py-5'
      )}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" aria-label="PinnacleStride Home" className="focus-visible:ring-2 rounded-lg">
          <Logo size="md" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setServicesOpen(!servicesOpen)}
              aria-expanded={servicesOpen}
              className={cn(
                'flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors min-h-[44px]',
                pathname.startsWith('/services')
                  ? 'text-[#1D4ED8] dark:text-[#3B82F6] font-semibold'
                  : 'text-[#0A1128] dark:text-[#F4F7FB] hover:text-[#1D4ED8] dark:hover:text-[#3B82F6]'
              )}
            >
              Services
              <ChevronDown
                className={cn('w-4 h-4 transition-transform duration-200', servicesOpen && 'rotate-180')}
                aria-hidden="true"
              />
            </button>

            {/* Mega Dropdown Panel */}
            {servicesOpen && (
              <div className="absolute top-full left-0 w-80 p-3 bg-white dark:bg-[#131F42] rounded-xl border border-[#D8E0EE] dark:border-[#22305A] shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="text-xs font-mono uppercase tracking-wider text-[#4A5878] dark:text-[#A9B6D3] px-2 py-1 mb-1">
                  Core Solutions
                </div>
                <div className="space-y-1">
                  {serviceLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-start gap-3 p-2 rounded-lg hover:bg-[#F4F7FB] dark:hover:bg-[#0F1A38] transition-colors group"
                      >
                        <div className="p-1.5 rounded-md bg-[#1D4ED8]/10 text-[#1D4ED8] dark:text-[#3B82F6] shrink-0 mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#0A1128] dark:text-[#F4F7FB] group-hover:text-[#1D4ED8] dark:group-hover:text-[#3B82F6]">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-[#4A5878] dark:text-[#A9B6D3] line-clamp-1">
                            {item.desc}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-2 pt-2 border-t border-[#D8E0EE] dark:border-[#22305A] px-2">
                  <Link
                    href="/services"
                    className="text-xs font-medium text-[#1D4ED8] dark:text-[#3B82F6] hover:underline flex items-center justify-between"
                  >
                    <span>View all services overview</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'px-3.5 py-2 rounded-lg text-sm font-medium transition-colors min-h-[44px] flex items-center',
                  isActive
                    ? 'text-[#1D4ED8] dark:text-[#3B82F6] font-semibold'
                    : 'text-[#0A1128] dark:text-[#F4F7FB] hover:text-[#1D4ED8] dark:hover:text-[#3B82F6]'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <Link href="/contact">
            <Button size="md" variant="primary">
              Start a Project
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="p-2.5 rounded-lg border border-[#D8E0EE] dark:border-[#22305A] text-[#0A1128] dark:text-[#F4F7FB] min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bottom-0 bg-white dark:bg-[#0A1128] p-6 overflow-y-auto border-t border-[#D8E0EE] dark:border-[#22305A] flex flex-col justify-between">
          <nav className="flex flex-col gap-2">
            <div className="font-mono text-xs uppercase tracking-wider text-[#4A5878] dark:text-[#A9B6D3] py-2">
              Navigation
            </div>
            <Link
              href="/services"
              className="py-3 px-3 rounded-lg text-base font-semibold hover:bg-[#F4F7FB] dark:hover:bg-[#131F42]"
            >
              Services Overview
            </Link>
            <div className="pl-4 flex flex-col gap-1 border-l-2 border-[#1D4ED8]/30 dark:border-[#3B82F6]/30 mb-2">
              {serviceLinks.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="py-2 text-sm text-[#4A5878] dark:text-[#A9B6D3] hover:text-[#1D4ED8] dark:hover:text-[#3B82F6]"
                >
                  {s.title}
                </Link>
              ))}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 px-3 rounded-lg text-base font-semibold hover:bg-[#F4F7FB] dark:hover:bg-[#131F42]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-6 border-t border-[#D8E0EE] dark:border-[#22305A] flex flex-col gap-3">
            <Link href="/contact" className="w-full">
              <Button size="lg" variant="primary" className="w-full">
                Start a Project
              </Button>
            </Link>
            <div className="text-center text-xs text-[#4A5878] dark:text-[#A9B6D3]">
              hello@pinnaclestride.com
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
