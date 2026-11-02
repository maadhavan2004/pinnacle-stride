import React from 'react';
import Link from 'next/link';
import { Logo } from '@ps/ui';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-bg-subtle border-t border-border pt-12 pb-10 transition-colors text-xs text-text-muted">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-border/80">
          {/* Brand & Systems Column */}
          <div className="lg:col-span-2 space-y-3.5">
            <Link href="/" aria-label="PinnacleStride">
              <Logo size="sm" />
            </Link>
            <p className="text-xs text-text-muted max-w-sm leading-relaxed">
              A product-building technology startup delivering custom digital solutions. Engineered with strict type safety, open standards, and measurable real-world outcomes.
            </p>

            {/* System Status Pill (Linear / Stripe style) */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface border border-border text-[11px] font-mono text-text-subtle">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational</span>
            </div>

            <div className="space-y-1 pt-1 text-[11px] text-text-subtle">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>Remote-First · Operating in IST (UTC+5:30)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <a href="mailto:hello@pinnaclestride.com" className="hover:text-text transition-colors">
                  hello@pinnaclestride.com
                </a>
              </div>
            </div>

            {/* Social & GitHub links */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://github.com/pinnaclestride"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-1.5 rounded-md hover:bg-surface-hover text-text-muted hover:text-text border border-border transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com/company/pinnaclestride"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-1.5 rounded-md hover:bg-surface-hover text-text-muted hover:text-text border border-border transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-2.5">
            <h3 className="text-[11px] font-mono uppercase tracking-wider text-text font-semibold">
              Company
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-text transition-colors">
                  About Us & Story
                </Link>
              </li>
              <li>
                <Link href="/how-we-work" className="hover:text-text transition-colors">
                  Delivery Process
                </Link>
              </li>
              <li>
                <Link href="/about#team" className="hover:text-text transition-colors">
                  Engineering Team
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-text transition-colors">
                  Start a Conversation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-2.5">
            <h3 className="text-[11px] font-mono uppercase tracking-wider text-text font-semibold">
              Services
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/services/websites-business-solutions"
                  className="hover:text-text transition-colors"
                >
                  Websites & Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/services/full-stack-development"
                  className="hover:text-text transition-colors"
                >
                  Full-Stack Apps
                </Link>
              </li>
              <li>
                <Link
                  href="/services/ai-machine-learning"
                  className="hover:text-text transition-colors"
                >
                  AI & Machine Learning
                </Link>
              </li>
              <li>
                <Link
                  href="/services/genai-agentic-ai"
                  className="hover:text-text transition-colors"
                >
                  GenAI & Agentic AI
                </Link>
              </li>
              <li>
                <Link
                  href="/services/cloud-deployment-integrations"
                  className="hover:text-text transition-colors"
                >
                  Cloud & Infrastructure
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Products & Legal */}
          <div className="space-y-2.5">
            <h3 className="text-[11px] font-mono uppercase tracking-wider text-text font-semibold">
              Products & Legal
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/products" className="hover:text-text transition-colors">
                  Software Products
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-text transition-colors">
                  Portfolio & Case Studies
                </Link>
              </li>
              <li className="pt-1.5 border-t border-border">
                <Link href="/privacy" className="hover:text-text transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-text transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-text transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-text-subtle">
          <div>
            © {new Date().getFullYear()} PinnacleStride. Built on open-source standards.
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono">Build Beyond. Stride Ahead.</span>
            <span>·</span>
            <Link href="/admin" className="hover:text-text transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
