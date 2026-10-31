'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from '@ps/ui';
import {
  InquiryStatus,
  InquiryStatusEnum,
  ServiceTypeLabels,
  BudgetRangeLabels,
  TimelineOptionLabels,
} from '@ps/schemas';
import {
  Download,
  Search,
  Filter,
  CheckCircle,
  MessageSquare,
  Clock,
  Send,
  User,
  Building,
  RefreshCw,
} from 'lucide-react';

interface InquiryRecord {
  id: string;
  fullName: string;
  email: string;
  company?: string | null;
  serviceType: string;
  budget: string;
  timeline: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
  notes?: { id: string; body: string; createdAt: string; authorName?: string }[];
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [newNote, setNewNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load inquiries (from API or local storage fallback)
  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
      const res = await fetch(`${apiUrl}/inquiries/admin`);
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.items || []);
        if (data.items?.length > 0 && !selectedInquiry) {
          setSelectedInquiry(data.items[0]);
        }
        setIsLoading(false);
        return;
      }
    } catch {
      // Fallback to local storage seeded records
    }

    // Default mock data if API is currently not running in background
    const local = JSON.parse(localStorage.getItem('ps_local_inquiries') || '[]');
    const initialSeed: InquiryRecord[] = [
      {
        id: 'iq-101',
        fullName: 'Vikram Patel',
        email: 'vikram@finscale.io',
        company: 'FinScale Solutions',
        serviceType: 'GENAI_AGENTIC',
        budget: 'RANGE_75K_2L',
        timeline: 'ONE_TO_THREE_MONTHS',
        message:
          'We require an enterprise internal RAG assistant to query compliance documentation and financial audit guidelines with deterministic citations and zero hallucination risk.',
        status: 'NEW',
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        notes: [
          {
            id: 'n-1',
            body: 'Initial review: High fit for StrideFlow RAG architecture. Recommend scheduling 30-min discovery call.',
            createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
            authorName: 'Aarav Sharma',
          },
        ],
      },
      {
        id: 'iq-102',
        fullName: 'Sneha Rao',
        email: 'sneha@healthpulse.org',
        company: 'HealthPulse Labs',
        serviceType: 'FULL_STACK_APP',
        budget: 'ABOVE_2L',
        timeline: 'TWO_TO_FOUR_WEEKS',
        message:
          'Looking to build a modular patient tracking dashboard with strict role-based access control, exportable audit logs, and HIPAA-compliant data segregation.',
        status: 'CONTACTED',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        notes: [],
      },
      {
        id: 'iq-103',
        fullName: 'Karan Mehra',
        email: 'karan@novabyte.com',
        company: 'NovaByte Media',
        serviceType: 'BUSINESS_WEBSITE',
        budget: 'RANGE_25K_75K',
        timeline: 'TWO_TO_FOUR_WEEKS',
        message:
          'Need a sub-2-second marketing front door with 95+ Lighthouse score, accessible UI, and self-hosted privacy analytics.',
        status: 'QUALIFIED',
        createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
        notes: [],
      },
    ];

    const merged = [...local, ...initialSeed];
    setInquiries(merged);
    if (!selectedInquiry && merged.length > 0) {
      setSelectedInquiry(merged[0] || null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (newStatus: InquiryStatus) => {
    if (!selectedInquiry) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
      await fetch(`${apiUrl}/inquiries/admin/${selectedInquiry.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch {
      // Local fallback
    }

    const updated = inquiries.map((item) =>
      item.id === selectedInquiry.id ? { ...item, status: newStatus } : item
    );
    setInquiries(updated);
    setSelectedInquiry({ ...selectedInquiry, status: newStatus });
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiry || !newNote.trim()) return;

    const noteObj = {
      id: `note-${Date.now()}`,
      body: newNote.trim(),
      createdAt: new Date().toISOString(),
      authorName: 'Current Admin',
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
      await fetch(`${apiUrl}/inquiries/admin/${selectedInquiry.id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: newNote.trim() }),
      });
    } catch {
      // Local fallback
    }

    const updatedNotes = [noteObj, ...(selectedInquiry.notes || [])];
    const updatedInquiry = { ...selectedInquiry, notes: updatedNotes };

    setSelectedInquiry(updatedInquiry);
    setInquiries(inquiries.map((iq) => (iq.id === selectedInquiry.id ? updatedInquiry : iq)));
    setNewNote('');
  };

  const handleExportCsv = () => {
    const valid = inquiries.filter((iq) => iq.status !== 'SPAM');
    const headers = ['ID', 'Date', 'Full Name', 'Email', 'Company', 'Service', 'Budget', 'Timeline', 'Status', 'Message'];
    const rows = valid.map((iq) => [
      iq.id,
      iq.createdAt,
      `"${iq.fullName.replace(/"/g, '""')}"`,
      `"${iq.email}"`,
      `"${(iq.company || '').replace(/"/g, '""')}"`,
      iq.serviceType,
      iq.budget,
      iq.timeline,
      iq.status,
      `"${iq.message.replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pinnaclestride_inquiries_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredInquiries = inquiries.filter((iq) => {
    const matchesStatus = statusFilter === 'ALL' || iq.status === statusFilter;
    const matchesSearch =
      !searchTerm ||
      iq.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      iq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (iq.company && iq.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      iq.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0A1128] dark:text-[#F4F7FB]">
            Inquiries Triage & Leads
          </h1>
          <p className="text-xs text-[#4A5878] dark:text-[#A9B6D3]">
            Review, evaluate, and manage inbound project requirements in real time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" onClick={fetchInquiries} disabled={isLoading}>
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button size="sm" variant="primary" onClick={handleExportCsv}>
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#131F42] border border-[#D8E0EE] dark:border-[#22305A] flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5878] dark:text-[#A9B6D3]" />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg text-xs bg-[#F4F7FB] dark:bg-[#0A1128] border border-[#D8E0EE] dark:border-[#22305A] text-[#0A1128] dark:text-[#F4F7FB] focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]"
          />
        </div>

        {/* Status Filter Pills */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {['ALL', ...InquiryStatusEnum.options].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
                statusFilter === st
                  ? 'bg-[#1D4ED8] dark:bg-[#3B82F6] text-white font-semibold'
                  : 'bg-[#F4F7FB] dark:bg-[#0A1128] text-[#4A5878] dark:text-[#A9B6D3] hover:text-[#0A1128] dark:hover:text-[#F4F7FB]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Split Pane: List on Left, Detail & Notes on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Inquiries Table / Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono text-[#4A5878] dark:text-[#A9B6D3] px-1">
            Showing {filteredInquiries.length} inquiries
          </div>

          <div className="space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
            {filteredInquiries.map((iq) => {
              const isSelected = selectedInquiry?.id === iq.id;
              return (
                <div
                  key={iq.id}
                  onClick={() => setSelectedInquiry(iq)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#1D4ED8] dark:border-[#3B82F6] bg-white dark:bg-[#131F42] shadow-md ring-1 ring-[#1D4ED8]'
                      : 'border-[#D8E0EE] dark:border-[#22305A] bg-white/70 dark:bg-[#131F42]/60 hover:bg-white dark:hover:bg-[#131F42]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-bold text-sm text-[#0A1128] dark:text-[#F4F7FB]">
                      {iq.fullName}
                    </span>
                    <Badge
                      variant={
                        iq.status === 'NEW'
                          ? 'status-blue'
                          : iq.status === 'WON'
                          ? 'status-green'
                          : iq.status === 'SPAM'
                          ? 'default'
                          : 'status-amber'
                      }
                      size="sm"
                    >
                      {iq.status}
                    </Badge>
                  </div>

                  <div className="text-xs text-[#0EA5A4] dark:text-[#2DD4BF] font-mono mb-1 truncate">
                    {ServiceTypeLabels[iq.serviceType as keyof typeof ServiceTypeLabels] || iq.serviceType}
                  </div>

                  <p className="text-xs text-[#4A5878] dark:text-[#A9B6D3] line-clamp-2 mb-3">
                    {iq.message}
                  </p>

                  <div className="flex items-center justify-between text-[11px] font-mono text-[#4A5878] dark:text-[#A9B6D3] pt-2 border-t border-[#D8E0EE]/50 dark:border-[#22305A]/50">
                    <span>{iq.company || 'Individual'}</span>
                    <span>{new Date(iq.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              );
            })}

            {filteredInquiries.length === 0 && (
              <div className="p-8 text-center text-xs text-[#4A5878] dark:text-[#A9B6D3] bg-white dark:bg-[#131F42] rounded-xl border border-[#D8E0EE] dark:border-[#22305A]">
                No inquiries matching active filters.
              </div>
            )}
          </div>
        </div>

        {/* Selected Inquiry Detail & Internal Notes (7 cols) */}
        <div className="lg:col-span-7">
          {selectedInquiry ? (
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#131F42] border border-[#D8E0EE] dark:border-[#22305A] space-y-6 shadow-sm">
              {/* Header & Status Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D8E0EE] dark:border-[#22305A]">
                <div>
                  <h2 className="text-xl font-bold text-[#0A1128] dark:text-[#F4F7FB]">
                    {selectedInquiry.fullName}
                  </h2>
                  <div className="flex items-center gap-3 text-xs text-[#4A5878] dark:text-[#A9B6D3] mt-1">
                    <a href={`mailto:${selectedInquiry.email}`} className="text-[#1D4ED8] dark:text-[#3B82F6] hover:underline font-mono">
                      {selectedInquiry.email}
                    </a>
                    {selectedInquiry.company && (
                      <>
                        <span>·</span>
                        <span>{selectedInquiry.company}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Status Changer */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#4A5878] dark:text-[#A9B6D3]">Status:</span>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => handleStatusChange(e.target.value as InquiryStatus)}
                    className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-[#F4F7FB] dark:bg-[#0A1128] border border-[#D8E0EE] dark:border-[#22305A] text-[#0A1128] dark:text-[#F4F7FB] focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]"
                  >
                    {InquiryStatusEnum.options.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Requirement Specifications */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-[#F4F7FB] dark:bg-[#0A1128] border border-[#D8E0EE] dark:border-[#22305A] text-xs">
                <div>
                  <div className="text-[11px] font-mono text-[#4A5878] dark:text-[#A9B6D3]">Service</div>
                  <div className="font-semibold text-[#0A1128] dark:text-[#F4F7FB] mt-0.5">
                    {ServiceTypeLabels[selectedInquiry.serviceType as keyof typeof ServiceTypeLabels] || selectedInquiry.serviceType}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[#4A5878] dark:text-[#A9B6D3]">Budget</div>
                  <div className="font-semibold text-[#0A1128] dark:text-[#F4F7FB] mt-0.5">
                    {BudgetRangeLabels[selectedInquiry.budget as keyof typeof BudgetRangeLabels] || selectedInquiry.budget}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[#4A5878] dark:text-[#A9B6D3]">Target Timeline</div>
                  <div className="font-semibold text-[#0A1128] dark:text-[#F4F7FB] mt-0.5">
                    {TimelineOptionLabels[selectedInquiry.timeline as keyof typeof TimelineOptionLabels] || selectedInquiry.timeline}
                  </div>
                </div>
              </div>

              {/* Inquiry Message */}
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0A1128] dark:text-[#F4F7FB]">
                  Submitted Requirements:
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-[#0A1128]/50 border border-[#D8E0EE] dark:border-[#22305A] text-sm text-[#0A1128] dark:text-[#F4F7FB] whitespace-pre-wrap leading-relaxed">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Internal Notes Section (FR-81) */}
              <div className="space-y-4 pt-4 border-t border-[#D8E0EE] dark:border-[#22305A]">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#0A1128] dark:text-[#F4F7FB] flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-[#0EA5A4] dark:text-[#2DD4BF]" />
                    Internal Team Notes & Next Steps
                  </h3>
                  <span className="text-xs font-mono text-[#4A5878] dark:text-[#A9B6D3]">
                    {selectedInquiry.notes?.length || 0} notes
                  </span>
                </div>

                {/* Add Note Form */}
                <form onSubmit={handleAddNote} className="space-y-2">
                  <textarea
                    rows={2}
                    placeholder="Add an internal note or action item (e.g. 'Sent discovery calendar link')..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="w-full p-3 rounded-lg text-xs bg-[#F4F7FB] dark:bg-[#0A1128] border border-[#D8E0EE] dark:border-[#22305A] text-[#0A1128] dark:text-[#F4F7FB] focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]"
                  />
                  <div className="flex justify-end">
                    <Button type="submit" size="sm" variant="primary" disabled={!newNote.trim()}>
                      <Send className="w-3 h-3 mr-1" />
                      Add Note
                    </Button>
                  </div>
                </form>

                {/* Notes History */}
                <div className="space-y-2.5 pt-2">
                  {selectedInquiry.notes?.map((n) => (
                    <div
                      key={n.id}
                      className="p-3 rounded-lg bg-[#F4F7FB] dark:bg-[#0A1128] border border-[#D8E0EE] dark:border-[#22305A] text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#4A5878] dark:text-[#A9B6D3]">
                        <span className="font-semibold text-[#0A1128] dark:text-[#F4F7FB]">
                          {n.authorName || 'Admin'}
                        </span>
                        <span>{new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-[#4A5878] dark:text-[#A9B6D3]">{n.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-[#4A5878] dark:text-[#A9B6D3] bg-white dark:bg-[#131F42] rounded-2xl border border-[#D8E0EE] dark:border-[#22305A]">
              Select an inquiry from the left to view requirements and triage.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
