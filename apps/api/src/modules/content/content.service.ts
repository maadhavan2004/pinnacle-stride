import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ContentService {
  constructor(private readonly prisma: PrismaService) {}

  // Services
  async getServices() {
    return this.prisma.service.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { sortOrder: 'asc' },
    });
  }

  async getServiceBySlug(slug: string) {
    const service = await this.prisma.service.findUnique({
      where: { slug },
    });
    if (!service || service.status !== 'PUBLISHED') {
      throw new NotFoundException(`Service ${slug} not found.`);
    }
    return service;
  }

  // Projects
  async getProjects(category?: string) {
    const where: any = { status: 'PUBLISHED' };
    if (category && category !== 'ALL') {
      where.category = category;
    }
    return this.prisma.project.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      include: {
        technologies: {
          include: { technology: true },
        },
      },
    });
  }

  async getProjectBySlug(slug: string) {
    const project = await this.prisma.project.findUnique({
      where: { slug },
      include: {
        technologies: {
          include: { technology: true },
        },
      },
    });
    if (!project || project.status !== 'PUBLISHED') {
      throw new NotFoundException(`Project ${slug} not found.`);
    }
    return project;
  }

  // Products
  async getProducts() {
    return this.prisma.product.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
      include: {
        technologies: {
          include: { technology: true },
        },
      },
    });
  }

  async getProductBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        technologies: {
          include: { technology: true },
        },
      },
    });
    if (!product || product.status !== 'PUBLISHED') {
      throw new NotFoundException(`Product ${slug} not found.`);
    }
    return product;
  }

  // Team
  async getTeam() {
    return this.prisma.teamMember.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: 'asc' },
    });
  }

  // Technologies
  async getTechnologies() {
    return this.prisma.technologyCategory.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        technologies: {
          where: { isPublished: true },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });
  }

  // FAQs
  async getFaqs() {
    return this.prisma.faq.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: 'asc' },
    });
  }
}
