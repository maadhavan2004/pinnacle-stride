import React from 'react';
import Link from 'next/link';
import { Logo } from '@ps/ui';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#F4F7FB] dark:bg-[#0F1A38] border-t border-[#D8E0EE] dark:border-[#22305A] pt-16 pb-12 transition-colors">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#D8E0EE] dark:border-[#22305A]">
          {/* Brand & Remote Statement Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" aria-label="PinnacleStride">
              <Logo size="md" />
            </Link>
            <p className="text-sm text-[#4A5878] dark:text-[#A9B6D3] max-w-sm leading-relaxed">
              A product-building technology startup delivering custom digital solutions. Engineered with strict type safety, open standards, and measurable real-world outcomes.
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs text-[#4A5878] dark:text-[#A9B6D3]">
                <MapPin className="w-4 h-4 text-[#0EA5A4] dark:text-[#2DD4BF] shrink-0" />
                <span>Remote-First · Operating in IST (UTC+5:30)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#4A5878] dark:text-[#A9B6D3]">
                <Mail className="w-4 h-4 text-[#0EA5A4] dark:text-[#2DD4BF] shrink-0" />
                <a href="mailto:hello@pinnaclestride.com" className="hover:underline">
                  hello@pinnaclestride.com
                </a>
              </div>
            </div>
            {/* Social & Code links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/pinnaclestride"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="PinnacleStride GitHub"
                className="p-2 rounded-lg bg-white dark:bg-[#131F42] border border-[#D8E0EE] dark:border-[#22305A] text-[#4A5878] dark:text-[#A9B6D3] hover:text-[#1D4ED8] dark:hover:text-[#3B82F6] transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/company/pinnaclestride"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="PinnacleStride LinkedIn"
                className="p-2 rounded-lg bg-white dark:bg-[#131F42] border border-[#D8E0EE] dark:border-[#22305A] text-[#4A5878] dark:text-[#A9B6D3] hover:text-[#1D4ED8] dark:hover:text-[#3B82F6] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0A1128] dark:text-[#F4F7FB]">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-[#4A5878] dark:text-[#A9B6D3]">
              <li>
                <Link href="/about" className="hover:text-[#1D4ED8] dark:hover:text-[#3B82F6] transition-colors">
                  About Us & Story
                </Link>
              </li>
              <li>
                <Link href="/how-we-work" className="hover:text-[#1D4ED8] dark:hover:text-[#3B82F6] transition-colors">
                  5-Stage Delivery Process
                </Link>
              </li>
              <li>
                <Link href="/about#team" className="hover:text-[#1D4ED8] dark:hover:text-[#3B82F6] transition-colors">
                  Our Engineering Team
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#1D4ED8] dark:hover:text-[#3B82F6] transition-colors">
                  Start a Conversation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0A1128] dark:text-[#F4F7FB]">
              Services
            </h3>
            <ul className="space-y-2 text-sm text-[#4A5878] dark:text-[#A9B6D3]">
              <li>
                <Link
                  href="/services/websites-business-solutions"
                  className="hover:text-[#1D4ED8] dark:hover:text-[#3B82F6] transition-colors"
                >
                  Websites & Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/services/full-stack-development"
                  className="hover:text-[#1D4ED8] dark:hover:text-[#3B82F6] transition-colors"
                >
                  Full-Stack Apps
                </Link>
              </li>
              <li>
                <Link
                  href="/services/ai-machine-learning"
                  className="hover:text-[#1D4ED8] dark:hover:text-[#3B82F6] transition-colors"
                >
                  AI & Machine Learning
                </Link>
              </li>
              <li>
                <Link
                  href="/services/genai-agentic-ai"
                  className="hover:text-[#1D4ED8] dark:hover:text-[#3B82F6] transition-colors"
                >
                  Generative & Agentic AI
                </Link>
              </li>
              <li>
                <Link
                  href="/services/cloud-deployment-integrations"
                  className="hover:text-[#1D4ED8] dark:hover:text-[#3B82F6] transition-colors"
                >
                  Cloud & Infrastructure
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Products & Legal */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0A1128] dark:text-[#F4F7FB]">
              Products & Legal
            </h3>
            <ul className="space-y-2 text-sm text-[#4A5878] dark:text-[#A9B6D3]">
              <li>
                <Link href="/products" className="hover:text-[#1D4ED8] dark:hover:text-[#3B82F6] transition-colors">
                  Software Products
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#1D4ED8] dark:hover:text-[#3B82F6] transition-colors">
                  Portfolio & Case Studies
                </Link>
              </li>
              <li className="pt-2 border-t border-[#D8E0EE] dark:border-[#22305A]">
                <Link href="/privacy" className="hover:text-[#1D4ED8] dark:hover:text-[#3B82F6] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#1D4ED8] dark:hover:text-[#3B82F6] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-[#1D4ED8] dark:hover:text-[#3B82F6] transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#4A5878] dark:text-[#A9B6D3]">
          <div>
            © {new Date().getFullYear()} PinnacleStride. All rights reserved. Built with open-source software.
          </div>
          <div className="flex items-center gap-6">
            <span>Tagline: Build Beyond. Stride Ahead.</span>
            <Link href="/admin" className="text-xs hover:underline opacity-60 hover:opacity-100">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
