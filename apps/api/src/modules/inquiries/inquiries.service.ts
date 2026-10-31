import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { InquiryInput, inquirySchema, InquiryStatus } from '@ps/schemas';
import * as crypto from 'crypto';

@Injectable()
export class InquiriesService {
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

    // 3. Hash IP address for privacy-conscious consent compliance
    const ipHash = crypto.createHash('sha256').update(ip || 'unknown').digest('hex');

    // 4. Create inquiry and consent record in a single transaction
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
  }

  async findAll(query: {
    status?: string;
    serviceType?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
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
    await this.findOne(id);
    return this.prisma.inquiry.update({
      where: { id },
      data: { status },
    });
  }

  async addNote(id: string, body: string, authorId?: string) {
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
    const inquiries = await this.prisma.inquiry.findMany({
      where: {
        deletedAt: null,
        status: { not: 'SPAM' },
      },
      orderBy: { createdAt: 'desc' },
    });

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

    const rows = inquiries.map((iq) => [
      iq.id,
      iq.createdAt.toISOString(),
      `"${iq.fullName.replace(/"/g, '""')}"`,
      `"${iq.email}"`,
      `"${(iq.company || '').replace(/"/g, '""')}"`,
      iq.serviceType,
      iq.budget,
      iq.timeline,
      iq.status,
      `"${iq.message.replace(/"/g, '""')}"`,
    ]);

    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  }
}
