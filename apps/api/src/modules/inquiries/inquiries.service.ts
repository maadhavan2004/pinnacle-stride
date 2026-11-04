import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { InquiryInput, inquirySchema, InquiryStatus } from '@ps/schemas';
import * as crypto from 'crypto';

@Injectable()
export class InquiriesService {
  private fallbackInquiries: any[] = [];

  constructor(private readonly prisma: PrismaService) {}

  async create(data: unknown, ip: string, userAgent?: string) {
    // 1. Validate payload with shared Zod schema
    const parseResult = inquirySchema.safeParse(data);
    if (!parseResult.success) {
      throw new BadRequestException({
        message: 'Validation failed for inquiry submission',
        errors: parseResult.error.flatten().fieldErrors,
      });
    }

    const input = parseResult.data;

    // 2. Honeypot verification (website must be empty)
    if (input.website && input.website.trim().length > 0) {
      // Spam honeypot triggered; silently record as spam or throw friendly error
      return {
        id: 'flagged',
        status: 'SPAM',
        message: "Thanks! We'll reply within 2 business days.",
      };
    }

    // Console notification alert for the team / administrator
    console.log(`\n=====================================================`);
    console.log(`🔔 NEW CLIENT INQUIRY RECEIVED`);
    console.log(`-----------------------------------------------------`);
    console.log(`From:     ${input.fullName} <${input.email}>`);
    console.log(`Company:  ${input.company || 'Not specified'}`);
    console.log(`Service:  ${input.serviceType}`);
    console.log(`Budget:   ${input.budgetRange}`);
    console.log(`Timeline: ${input.timeline}`);
    console.log(`Message:  ${input.message}`);
    console.log(`Time:     ${new Date().toLocaleString()}`);
    console.log(`=====================================================\n`);

    // 3. Hash IP address for privacy-conscious consent compliance
    const ipHash = crypto.createHash('sha256').update(ip || 'unknown').digest('hex');

    // 4. If database is connected, persist to PostgreSQL
    if (this.prisma.isConnected) {
      try {
        const inquiry = await this.prisma.inquiry.create({
          data: {
            fullName: input.fullName,
            email: input.email,
            company: input.company || null,
            serviceType: input.serviceType,
            budget: input.budgetRange,
            timeline: input.timeline,
            message: input.message,
            status: 'NEW',
            sourcePage: input.sourcePage || null,
            utm: input.utm || {},
            ipHash,
            userAgent: userAgent || null,
            consentRecord: {
              create: {
                purpose: 'project_inquiry',
                policyVersion: '1.0',
                ipHash,
              },
            },
          },
        });

        return {
          id: inquiry.id,
          status: inquiry.status,
          message: "Thanks! We'll reply within 2 business days.",
        };
      } catch (err: any) {
        console.warn('Prisma insert failed, saving in resilient memory store:', err.message);
      }
    }

    // 5. Fallback storage when PostgreSQL is deferred / offline
    const fallbackId = `iq-${Date.now()}`;
    const fallbackRecord = {
      id: fallbackId,
      fullName: input.fullName,
      email: input.email,
      company: input.company || null,
      serviceType: input.serviceType,
      budget: input.budgetRange,
      timeline: input.timeline,
      message: input.message,
      status: 'NEW',
      createdAt: new Date(),
      notes: [],
    };
    this.fallbackInquiries.unshift(fallbackRecord);

    return {
      id: fallbackId,
      status: 'NEW',
      message: "Thanks! We'll reply within 2 business days.",
    };
  }

  async findAll(query: {
    status?: string;
    serviceType?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    if (!this.prisma.isConnected) {
      let filtered = [...this.fallbackInquiries];
      if (query.status && query.status !== 'ALL') {
        filtered = filtered.filter((i) => i.status === query.status);
      }
      if (query.serviceType && query.serviceType !== 'ALL') {
        filtered = filtered.filter((i) => i.serviceType === query.serviceType);
      }
      if (query.search) {
        const s = query.search.toLowerCase();
        filtered = filtered.filter(
          (i) =>
            i.fullName.toLowerCase().includes(s) ||
            i.email.toLowerCase().includes(s) ||
            (i.company && i.company.toLowerCase().includes(s)) ||
            i.message.toLowerCase().includes(s)
        );
      }
      return {
        items: filtered,
        meta: {
          total: filtered.length,
          page: 1,
          limit: 100,
          totalPages: 1,
        },
      };
    }

    const page = Number(query.page) || 1;
    const limit = Math.min(Number(query.limit) || 20, 100);
    const skip = (page - 1) * limit;

    const where: any = {
      deletedAt: null,
    };

    if (query.status && query.status !== 'ALL') {
      where.status = query.status;
    }
    if (query.serviceType && query.serviceType !== 'ALL') {
      where.serviceType = query.serviceType;
    }
    if (query.search) {
      where.OR = [
        { fullName: { contains: query.search, mode: 'insensitive' } },
        { email: { contains: query.search, mode: 'insensitive' } },
        { company: { contains: query.search, mode: 'insensitive' } },
        { message: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.inquiry.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          notes: {
            orderBy: { createdAt: 'desc' },
            include: { author: { select: { displayName: true, email: true } } },
          },
        },
      }),
      this.prisma.inquiry.count({ where }),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    if (!this.prisma.isConnected) {
      const found = this.fallbackInquiries.find((i) => i.id === id);
      if (!found) {
        throw new NotFoundException(`Inquiry with ID ${id} not found.`);
      }
      return found;
    }

    const inquiry = await this.prisma.inquiry.findFirst({
      where: { id, deletedAt: null },
      include: {
        notes: {
          orderBy: { createdAt: 'desc' },
          include: { author: { select: { displayName: true, email: true } } },
        },
        consentRecord: true,
      },
    });

    if (!inquiry) {
      throw new NotFoundException(`Inquiry with ID ${id} not found.`);
    }

    return inquiry;
  }

  async updateStatus(id: string, status: InquiryStatus) {
    if (!this.prisma.isConnected) {
      const found = this.fallbackInquiries.find((i) => i.id === id);
      if (found) {
        found.status = status;
      }
      return found;
    }

    await this.findOne(id);
    return this.prisma.inquiry.update({
      where: { id },
      data: { status },
    });
  }

  async addNote(id: string, body: string, authorId?: string) {
    if (!this.prisma.isConnected) {
      const found = this.fallbackInquiries.find((i) => i.id === id);
      if (found) {
        if (!found.notes) found.notes = [];
        const note = {
          id: `note-${Date.now()}`,
          body,
          createdAt: new Date(),
          authorName: 'Administrator',
        };
        found.notes.unshift(note);
        return note;
      }
      return { id: `note-${Date.now()}`, body };
    }

    await this.findOne(id);
    return this.prisma.inquiryNote.create({
      data: {
        inquiryId: id,
        authorId: authorId || null,
        body,
      },
    });
  }

  async exportCsv() {
    const inquiries = this.prisma.isConnected
      ? await this.prisma.inquiry.findMany({
          where: {
            deletedAt: null,
            status: { not: 'SPAM' },
          },
          orderBy: { createdAt: 'desc' },
        })
      : this.fallbackInquiries;

    const headers = [
      'ID',
      'Date (UTC)',
      'Full Name',
      'Email',
      'Company',
      'Service',
      'Budget',
      'Timeline',
      'Status',
      'Message',
    ];

    const rows = inquiries.map((iq: any) => [
      iq.id,
      iq.createdAt instanceof Date ? iq.createdAt.toISOString() : iq.createdAt,
      `"${iq.fullName.replace(/"/g, '""')}"`,
      `"${iq.email}"`,
      `"${(iq.company || '').replace(/"/g, '""')}"`,
      iq.serviceType,
      iq.budget,
      iq.timeline,
      iq.status,
      `"${iq.message.replace(/"/g, '""')}"`,
    ]);

    return [headers.join(','), ...rows.map((r: any) => r.join(','))].join('\n');
  }
}
