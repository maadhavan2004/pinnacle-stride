import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Logo } from '@ps/ui';
import { LayoutDashboard, Inbox, FolderKanban, Boxes, Users, Settings, LogOut, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admin Portal — PinnacleStride',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F4F7FB] dark:bg-[#0A1128] text-[#0A1128] dark:text-[#F4F7FB] flex flex-col">
      {/* Admin Top Navigation */}
      <header className="h-16 border-b border-[#D8E0EE] dark:border-[#22305A] bg-white dark:bg-[#131F42] px-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin">
            <Logo size="sm" showText={true} />
          </Link>
          <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-[#1D4ED8]/10 text-[#1D4ED8] dark:text-[#3B82F6] font-semibold">
            Operations Backoffice
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-[#4A5878] dark:text-[#A9B6D3] hover:text-[#0A1128] dark:hover:text-[#F4F7FB]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </Link>
          <div className="h-4 w-px bg-[#D8E0EE] dark:border-[#22305A]" />
          <span className="font-mono text-[#0EA5A4] dark:text-[#2DD4BF]">admin@pinnaclestride.com</span>
        </div>
      </header>

      {/* Admin Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 border-r border-[#D8E0EE] dark:border-[#22305A] bg-white dark:bg-[#131F42] p-4 hidden md:flex flex-col justify-between">
          <nav className="space-y-1.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#4A5878] dark:text-[#A9B6D3] px-3 py-2">
              Management
            </div>

            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-[#F4F7FB] dark:hover:bg-[#0A1128] text-[#1D4ED8] dark:text-[#3B82F6] bg-[#1D4ED8]/10 dark:bg-[#3B82F6]/10"
            >
              <Inbox className="w-4 h-4" />
              <span>Inquiries Triage</span>
            </Link>

            <Link
              href="/projects"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#4A5878] dark:text-[#A9B6D3] hover:bg-[#F4F7FB] dark:hover:bg-[#0A1128]"
            >
              <FolderKanban className="w-4 h-4" />
              <span>Portfolio & Projects</span>
            </Link>

            <Link
              href="/products"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#4A5878] dark:text-[#A9B6D3] hover:bg-[#F4F7FB] dark:hover:bg-[#0A1128]"
            >
              <Boxes className="w-4 h-4" />
              <span>Products Catalog</span>
            </Link>

            <Link
              href="/about#team"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#4A5878] dark:text-[#A9B6D3] hover:bg-[#F4F7FB] dark:hover:bg-[#0A1128]"
            >
              <Users className="w-4 h-4" />
              <span>Team Profiles</span>
            </Link>
          </nav>

          <div className="pt-4 border-t border-[#D8E0EE] dark:border-[#22305A]">
            <div className="text-[11px] font-mono text-[#4A5878] dark:text-[#A9B6D3] px-3 py-1">
              Role: <span className="font-bold text-[#2DD4BF]">OWNER</span>
            </div>
          </div>
        </aside>

        {/* Main Admin View */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
