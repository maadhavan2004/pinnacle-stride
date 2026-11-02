import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Logo } from '@ps/ui';
import {
  Inbox,
  FolderKanban,
  Boxes,
  Users,
  ArrowLeft,
  ExternalLink,
  Shield,
  Activity,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Operations Dashboard — PinnacleStride Admin',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg text-text flex flex-col font-sans">
      {/* Sleek Top Bar (Linear / Raycast style) */}
      <header className="h-12 border-b border-border bg-surface/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="focus-visible:ring-1 rounded">
            <Logo size="sm" showText={true} />
          </Link>
          <div className="h-3.5 w-px bg-border" />
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-surface-hover border border-border text-text">
              control-plane
            </span>
            <span className="text-text-subtle">/</span>
            <span className="text-text font-medium text-xs">triage</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-text-subtle">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>API Live</span>
          </div>
          <div className="h-3.5 w-px bg-border hidden sm:block" />
          <Link
            href="/"
            className="flex items-center gap-1 text-text-muted hover:text-text transition-colors text-xs"
          >
            <span>Public Site</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </Link>
          <div className="h-3.5 w-px bg-border" />
          <div className="flex items-center gap-1.5 text-xs font-mono text-text-muted">
            <Shield className="w-3.5 h-3.5 text-primary" />
            <span className="hidden md:inline">OWNER</span>
          </div>
        </div>
      </header>

      {/* Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-56 border-r border-border bg-bg-subtle/50 p-3 hidden md:flex flex-col justify-between shrink-0">
          <nav className="space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-wider text-text-subtle px-2.5 py-1.5">
              Workspace
            </div>

            <Link
              href="/admin"
              className="flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium bg-surface text-text border border-border shadow-xs transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Inbox className="w-3.5 h-3.5 text-primary" />
                <span>Inquiries Triage</span>
              </div>
              <span className="text-[10px] font-mono text-text-subtle">⌘1</span>
            </Link>

            <Link
              href="/projects"
              className="flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium text-text-muted hover:text-text hover:bg-surface transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <FolderKanban className="w-3.5 h-3.5" />
                <span>Portfolio</span>
              </div>
            </Link>

            <Link
              href="/products"
              className="flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium text-text-muted hover:text-text hover:bg-surface transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Boxes className="w-3.5 h-3.5" />
                <span>Products</span>
              </div>
            </Link>

            <Link
              href="/about#team"
              className="flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium text-text-muted hover:text-text hover:bg-surface transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-3.5 h-3.5" />
                <span>Team</span>
              </div>
            </Link>
          </nav>

          <div className="p-2.5 rounded-lg border border-border bg-surface/50 text-[11px] space-y-1">
            <div className="text-text-subtle flex items-center justify-between">
              <span>Environment</span>
              <span className="font-mono text-emerald-500 font-semibold">dev</span>
            </div>
            <div className="text-text-subtle flex items-center justify-between">
              <span>Latency</span>
              <span className="font-mono text-text">14ms</span>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
