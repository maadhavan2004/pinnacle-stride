'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Button, Badge } from '@ps/ui';
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
  CheckCircle,
  MessageSquare,
  Clock,
  Send,
  User,
  Building,
  RefreshCw,
  Mail,
  Copy,
  Check,
  TrendingUp,
  Inbox,
  AlertCircle,
  ChevronRight,
  Filter,
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
  const [copiedId, setCopiedId] = useState(false);

  // Fetch inquiries from API with fallback to local storage
  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
      const res = await fetch(`${apiUrl}/inquiries/admin`);
      if (res.ok) {
        const data = await res.json();
        const items = data.items || [];
        setInquiries(items);
        if (items.length > 0 && !selectedInquiry) {
          setSelectedInquiry(items[0]);
        }
        setIsLoading(false);
        return;
      }
    } catch {
      // Local fallback
    }

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
        createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
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

  // Compute real metrics from loaded data
  const metrics = useMemo(() => {
    const total = inquiries.filter((i) => i.status !== 'SPAM').length;
    const newCount = inquiries.filter((i) => i.status === 'NEW').length;
    const contactedCount = inquiries.filter((i) => i.status === 'CONTACTED').length;
    const qualifiedCount = inquiries.filter((i) => i.status === 'QUALIFIED').length;
    const wonCount = inquiries.filter((i) => i.status === 'WON').length;
    return { total, newCount, contactedCount, qualifiedCount, wonCount };
  }, [inquiries]);

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

  const handleCopyEmail = () => {
    if (!selectedInquiry) return;
    navigator.clipboard.writeText(selectedInquiry.email);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 1500);
  };

  const handleExportCsv = () => {
    const valid = inquiries.filter((iq) => iq.status !== 'SPAM');
    const headers = ['ID', 'Date (UTC)', 'Full Name', 'Email', 'Company', 'Service', 'Budget', 'Timeline', 'Status', 'Message'];
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
    link.setAttribute('download', `pinnaclestride_leads_${Date.now()}.csv`);
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
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Metric Overview Bar (Stripe / Linear KPI Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl border border-border bg-surface shadow-xs space-y-1">
          <div className="text-[11px] font-mono text-text-subtle uppercase tracking-wider flex items-center justify-between">
            <span>Total Inquiries</span>
            <Inbox className="w-3.5 h-3.5 text-text-subtle" />
          </div>
          <div className="text-2xl font-bold font-mono tracking-tight text-text">
            {metrics.total}
          </div>
          <div className="text-[11px] text-text-subtle">Excluding spam entries</div>
        </div>

        <div className="p-4 rounded-xl border border-border bg-surface shadow-xs space-y-1">
          <div className="text-[11px] font-mono text-text-subtle uppercase tracking-wider flex items-center justify-between">
            <span>Awaiting Triage</span>
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          </div>
          <div className="text-2xl font-bold font-mono tracking-tight text-blue-500">
            {metrics.newCount}
          </div>
          <div className="text-[11px] text-text-subtle">Status: NEW</div>
        </div>

        <div className="p-4 rounded-xl border border-border bg-surface shadow-xs space-y-1">
          <div className="text-[11px] font-mono text-text-subtle uppercase tracking-wider flex items-center justify-between">
            <span>Qualified Pipeline</span>
            <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-mono tracking-tight text-text">
            {metrics.qualifiedCount}
          </div>
          <div className="text-[11px] text-text-subtle">Ready for proposal</div>
        </div>

        <div className="p-4 rounded-xl border border-border bg-surface shadow-xs space-y-1">
          <div className="text-[11px] font-mono text-text-subtle uppercase tracking-wider flex items-center justify-between">
            <span>Milestones Won</span>
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold font-mono tracking-tight text-emerald-500">
            {metrics.wonCount}
          </div>
          <div className="text-[11px] text-text-subtle">Active engagements</div>
        </div>
      </div>

      {/* 2. Action & Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle" />
          <input
            type="text"
            placeholder="Search leads by name, email, company, keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs bg-surface border border-border text-text placeholder:text-text-subtle focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Filter Pills & Actions */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center p-0.5 rounded-lg border border-border bg-surface text-xs font-mono">
            {['ALL', 'NEW', 'QUALIFIED', 'WON', 'SPAM'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-md text-[11px] transition-colors ${
                  statusFilter === st
                    ? 'bg-text text-bg font-medium shadow-xs'
                    : 'text-text-muted hover:text-text'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <Button size="sm" variant="secondary" onClick={fetchInquiries} disabled={isLoading} className="text-xs">
            <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>

          <Button size="sm" variant="secondary" onClick={handleExportCsv} className="text-xs">
            <Download className="w-3 h-3 mr-1.5" />
            CSV
          </Button>
        </div>
      </div>

      {/* 3. Split-Pane Triage View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Triage List (5 cols) */}
        <div className="lg:col-span-5 space-y-2">
          <div className="text-[11px] font-mono text-text-subtle px-1 flex items-center justify-between">
            <span>Queue ({filteredInquiries.length})</span>
            <span>Sorted by Recent</span>
          </div>

          <div className="space-y-1.5 max-h-[640px] overflow-y-auto pr-1">
            {filteredInquiries.map((iq) => {
              const isSelected = selectedInquiry?.id === iq.id;
              const dateStr = new Date(iq.createdAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
              });

              return (
                <div
                  key={iq.id}
                  onClick={() => setSelectedInquiry(iq)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-primary/80 bg-surface shadow-xs ring-1 ring-primary/40'
                      : 'border-border bg-surface/60 hover:bg-surface hover:border-text-subtle/30'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-surface-hover border border-border text-[11px] font-semibold text-text flex items-center justify-center">
                        {iq.fullName[0]}
                      </div>
                      <span className="font-medium text-xs text-text truncate max-w-[140px]">
                        {iq.fullName}
                      </span>
                    </div>

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

                  <div className="text-[11px] font-mono text-text-subtle mb-1 truncate">
                    {iq.company || 'Direct Client'} ·{' '}
                    <span className="text-text-muted">
                      {ServiceTypeLabels[iq.serviceType as keyof typeof ServiceTypeLabels] || iq.serviceType}
                    </span>
                  </div>

                  <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
                    {iq.message}
                  </p>

                  <div className="mt-2 pt-2 border-t border-border/40 flex items-center justify-between text-[10px] font-mono text-text-subtle">
                    <span>{BudgetRangeLabels[iq.budget as keyof typeof BudgetRangeLabels] || iq.budget}</span>
                    <span>{dateStr}</span>
                  </div>
                </div>
              );
            })}

            {filteredInquiries.length === 0 && (
              <div className="p-8 text-center text-xs text-text-muted rounded-xl border border-dashed border-border bg-surface/30">
                No inquiries match your current filters.
              </div>
            )}
          </div>
        </div>

        {/* Right: Selected Lead Inspector & Notes (7 cols) */}
        <div className="lg:col-span-7">
          {selectedInquiry ? (
            <div className="p-5 sm:p-6 rounded-xl border border-border bg-surface shadow-xs space-y-5">
              {/* Lead Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-border">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-semibold text-text">
                      {selectedInquiry.fullName}
                    </h2>
                    <Badge variant="default" size="sm">
                      {selectedInquiry.company || 'Individual'}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <a
                      href={`mailto:${selectedInquiry.email}`}
                      className="font-mono text-primary hover:underline flex items-center gap-1"
                    >
                      <Mail className="w-3 h-3" />
                      <span>{selectedInquiry.email}</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label="Copy email"
                      className="text-text-subtle hover:text-text p-1 rounded"
                    >
                      {copiedId ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* Status Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-text-subtle">State:</span>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => handleStatusChange(e.target.value as InquiryStatus)}
                    className="h-8 px-2.5 rounded-md bg-surface-hover border border-border text-xs font-mono font-medium text-text focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                  >
                    {InquiryStatusEnum.options.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Requirement Specifications Grid */}
              <div className="grid grid-cols-3 gap-3 p-3.5 rounded-lg bg-bg-subtle border border-border text-xs font-mono">
                <div>
                  <div className="text-[10px] text-text-subtle uppercase">Target Solution</div>
                  <div className="font-medium text-text mt-0.5 truncate">
                    {ServiceTypeLabels[selectedInquiry.serviceType as keyof typeof ServiceTypeLabels] || selectedInquiry.serviceType}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-text-subtle uppercase">Indicative Budget</div>
                  <div className="font-medium text-text mt-0.5 truncate">
                    {BudgetRangeLabels[selectedInquiry.budget as keyof typeof BudgetRangeLabels] || selectedInquiry.budget}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-text-subtle uppercase">Timeline</div>
                  <div className="font-medium text-text mt-0.5 truncate">
                    {TimelineOptionLabels[selectedInquiry.timeline as keyof typeof TimelineOptionLabels] || selectedInquiry.timeline}
                  </div>
                </div>
              </div>

              {/* Inbound Requirements Message */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono uppercase tracking-wider text-text-subtle">
                  Submitted Requirements
                </div>
                <div className="p-3.5 rounded-lg bg-surface-hover/50 border border-border text-xs text-text leading-relaxed whitespace-pre-wrap font-sans">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Internal Notes & Follow-up Trail */}
              <div className="space-y-3 pt-3 border-t border-border">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-medium text-text">
                    <MessageSquare className="w-3.5 h-3.5 text-primary" />
                    <span>Internal Activity & Notes</span>
                  </div>
                  <span className="text-[10px] font-mono text-text-subtle">
                    {selectedInquiry.notes?.length || 0} entries
                  </span>
                </div>

                {/* Add Note Form */}
                <form onSubmit={handleAddNote} className="space-y-2">
                  <textarea
                    rows={2}
                    placeholder="Log team feedback, qualification notes, or call reminders..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="w-full p-2.5 rounded-lg text-xs bg-bg-subtle border border-border text-text placeholder:text-text-subtle focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <div className="flex justify-end">
                    <Button type="submit" size="sm" variant="primary" disabled={!newNote.trim()}>
                      <Send className="w-3 h-3 mr-1" />
                      Add Note
                    </Button>
                  </div>
                </form>

                {/* Existing Notes */}
                <div className="space-y-2 pt-1 max-h-48 overflow-y-auto">
                  {selectedInquiry.notes?.map((n) => (
                    <div
                      key={n.id}
                      className="p-2.5 rounded-lg bg-surface-hover/70 border border-border text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-text-subtle">
                        <span className="font-semibold text-text">{n.authorName || 'Admin'}</span>
                        <span>{new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-text-muted text-xs leading-relaxed">{n.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-text-muted border border-border rounded-xl bg-surface/50">
              Select an inquiry to view details and triage.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
