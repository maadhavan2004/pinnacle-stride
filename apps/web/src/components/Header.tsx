'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo, Button, cn } from '@ps/ui';
import { ThemeToggle } from './ThemeToggle';
import { ChevronDown, Menu, X, ArrowRight, Layers, Cpu, Sparkles, Globe, Cloud, Lock } from 'lucide-react';

const serviceLinks = [
  {
    href: '/services/websites-business-solutions',
    title: 'Websites & Solutions',
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
    title: 'Cloud & Infrastructure',
    desc: 'Container topology, automatic TLS & telemetry',
    icon: Cloud,
  },
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Global employee keyboard shortcut: Alt+A or Ctrl+Shift+A opens Admin Portal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.altKey && e.key.toLowerCase() === 'a') ||
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a')
      ) {
        e.preventDefault();
        window.location.href = '/admin';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { href: '/products', label: 'Products' },
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
    { href: '/how-we-work', label: 'Process' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-bg/85 border-b border-border transition-colors">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" aria-label="PinnacleStride Home" className="focus-visible:ring-1 rounded-md">
          <Logo size="sm" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
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
                'flex items-center gap-1 text-xs font-medium transition-colors py-2',
                pathname.startsWith('/services')
                  ? 'text-text font-semibold'
                  : 'text-text-muted hover:text-text'
              )}
            >
              Services
              <ChevronDown
                className={cn('w-3 h-3 transition-transform duration-150 opacity-60', servicesOpen && 'rotate-180')}
                aria-hidden="true"
              />
            </button>

            {/* Dropdown Menu */}
            {servicesOpen && (
              <div className="absolute top-full left-0 w-72 p-2 bg-surface rounded-xl border border-border shadow-lg animate-in fade-in zoom-in-95 duration-100">
                <div className="text-[10px] font-mono uppercase tracking-wider text-text-subtle px-2.5 py-1 mb-1">
                  Capabilities
                </div>
                <div className="space-y-0.5">
                  {serviceLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-surface-hover transition-colors group"
                      >
                        <div className="p-1 rounded bg-surface-hover text-text-muted group-hover:text-primary shrink-0 mt-0.5">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-medium text-text group-hover:text-primary transition-colors">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-text-subtle line-clamp-1">
                            {item.desc}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-1 pt-1.5 border-t border-border/60 px-2">
                  <Link
                    href="/services"
                    className="text-[11px] font-medium text-text-muted hover:text-text flex items-center justify-between py-1"
                  >
                    <span>View all services overview</span>
                    <ArrowRight className="w-3 h-3" />
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
                  'text-xs font-medium transition-colors py-2',
                  isActive ? 'text-text font-semibold' : 'text-text-muted hover:text-text'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/admin"
            title="Employee & Admin Portal (Alt+A)"
            aria-label="Staff and Admin Portal"
            className="p-1.5 rounded-md hover:bg-surface-hover text-text-subtle hover:text-text border border-border transition-colors flex items-center justify-center"
          >
            <Lock className="w-3.5 h-3.5" />
          </Link>
          <div className="h-4 w-px bg-border mx-0.5" />
          <Link href="/contact">
            <Button size="sm" variant="primary">
              Start a Project
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Link
            href="/admin"
            title="Staff Access"
            aria-label="Staff Portal"
            className="p-1.5 rounded-md text-text-subtle hover:text-text hover:bg-surface-hover border border-border"
          >
            <Lock className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="p-1.5 rounded-md text-text-muted hover:text-text hover:bg-surface-hover border border-border"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-surface px-6 py-5 space-y-4 animate-in fade-in duration-150">
          <nav className="flex flex-col gap-2">
            <div className="text-[10px] font-mono uppercase tracking-wider text-text-subtle">
              Navigation
            </div>
            <Link
              href="/services"
              className="py-1.5 text-xs font-medium text-text hover:text-primary"
            >
              Services Overview
            </Link>
            <div className="pl-3 flex flex-col gap-1 border-l border-border my-1">
              {serviceLinks.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="py-1 text-xs text-text-muted hover:text-text"
                >
                  {s.title}
                </Link>
              ))}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-1.5 text-xs font-medium text-text hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-border flex flex-col gap-2.5">
            <Link href="/contact" className="w-full">
              <Button size="md" variant="primary" className="w-full text-xs">
                Start a Project
              </Button>
            </Link>
            <div className="flex items-center justify-between text-[11px] text-text-subtle pt-1 font-mono">
              <span>hello@pinnaclestride.com</span>
              <Link href="/admin" className="hover:text-text flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>Staff Portal</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
