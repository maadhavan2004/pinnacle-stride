import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  servicesData,
  projectsData,
  productsData,
  teamMembersData,
  technologyCategories,
  faqsData,
} from '@ps/content';

@Injectable()
export class ContentService {
  constructor(private readonly prisma: PrismaService) {}

  // Services
  async getServices() {
    if (!this.prisma.isConnected) return servicesData;
    try {
      return await this.prisma.service.findMany({
        where: { status: 'PUBLISHED' },
        orderBy: { sortOrder: 'asc' },
      });
    } catch {
      return servicesData;
    }
  }

  async getServiceBySlug(slug: string) {
    if (!this.prisma.isConnected) {
      const fallback = servicesData.find((s) => s.slug === slug);
      if (!fallback) throw new NotFoundException(`Service ${slug} not found.`);
      return fallback;
    }
    try {
      const service = await this.prisma.service.findUnique({
        where: { slug },
      });
      if (service && service.status === 'PUBLISHED') return service;
    } catch {
      // fallback
    }
    const fallback = servicesData.find((s) => s.slug === slug);
    if (!fallback) throw new NotFoundException(`Service ${slug} not found.`);
    return fallback;
  }

  // Projects
  async getProjects(category?: string) {
    if (!this.prisma.isConnected) {
      if (category && category !== 'ALL') {
        return projectsData.filter((p) => p.category === category);
      }
      return projectsData;
    }
    try {
      const where: any = { status: 'PUBLISHED' };
      if (category && category !== 'ALL') {
        where.category = category;
      }
      return await this.prisma.project.findMany({
        where,
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
        include: {
          technologies: {
            include: { technology: true },
          },
        },
      });
    } catch {
      if (category && category !== 'ALL') {
        return projectsData.filter((p) => p.category === category);
      }
      return projectsData;
    }
  }

  async getProjectBySlug(slug: string) {
    if (!this.prisma.isConnected) {
      const fallback = projectsData.find((p) => p.slug === slug);
      if (!fallback) throw new NotFoundException(`Project ${slug} not found.`);
      return fallback;
    }
    try {
      const project = await this.prisma.project.findUnique({
        where: { slug },
        include: {
          technologies: {
            include: { technology: true },
          },
        },
      });
      if (project && project.status === 'PUBLISHED') return project;
    } catch {
      // fallback
    }
    const fallback = projectsData.find((p) => p.slug === slug);
    if (!fallback) throw new NotFoundException(`Project ${slug} not found.`);
    return fallback;
  }

  // Products
  async getProducts() {
    if (!this.prisma.isConnected) return productsData;
    try {
      return await this.prisma.product.findMany({
        where: { status: 'PUBLISHED' },
        orderBy: { createdAt: 'desc' },
        include: {
          technologies: {
            include: { technology: true },
          },
        },
      });
    } catch {
      return productsData;
    }
  }

  async getProductBySlug(slug: string) {
    if (!this.prisma.isConnected) {
      const fallback = productsData.find((p) => p.slug === slug);
      if (!fallback) throw new NotFoundException(`Product ${slug} not found.`);
      return fallback;
    }
    try {
      const product = await this.prisma.product.findUnique({
        where: { slug },
        include: {
          technologies: {
            include: { technology: true },
          },
        },
      });
      if (product && product.status === 'PUBLISHED') return product;
    } catch {
      // fallback
    }
    const fallback = productsData.find((p) => p.slug === slug);
    if (!fallback) throw new NotFoundException(`Product ${slug} not found.`);
    return fallback;
  }

  // Team
  async getTeam() {
    if (!this.prisma.isConnected) return teamMembersData;
    try {
      return await this.prisma.teamMember.findMany({
        where: { isPublished: true },
        orderBy: { sortOrder: 'asc' },
      });
    } catch {
      return teamMembersData;
    }
  }

  // Technologies
  async getTechnologies() {
    if (!this.prisma.isConnected) return technologyCategories;
    try {
      return await this.prisma.technologyCategory.findMany({
        orderBy: { sortOrder: 'asc' },
        include: {
          technologies: {
            where: { isPublished: true },
            orderBy: { sortOrder: 'asc' },
          },
        },
      });
    } catch {
      return technologyCategories;
    }
  }

  // FAQs
  async getFaqs() {
    if (!this.prisma.isConnected) return faqsData;
    try {
      return await this.prisma.faq.findMany({
        where: { isPublished: true },
        orderBy: { sortOrder: 'asc' },
      });
    } catch {
      return faqsData;
    }
  }
}
