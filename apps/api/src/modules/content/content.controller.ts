import { Controller, Get, Param, Query } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller()
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get('services')
  async getServices() {
    return this.contentService.getServices();
  }

  @Get('services/:slug')
  async getServiceBySlug(@Param('slug') slug: string) {
    return this.contentService.getServiceBySlug(slug);
  }

  @Get('projects')
  async getProjects(@Query('category') category?: string) {
    return this.contentService.getProjects(category);
  }

  @Get('projects/:slug')
  async getProjectBySlug(@Param('slug') slug: string) {
    return this.contentService.getProjectBySlug(slug);
  }

  @Get('products')
  async getProducts() {
    return this.contentService.getProducts();
  }

  @Get('products/:slug')
  async getProductBySlug(@Param('slug') slug: string) {
    return this.contentService.getProductBySlug(slug);
  }

  @Get('team')
  async getTeam() {
    return this.contentService.getTeam();
  }

  @Get('technologies')
  async getTechnologies() {
    return this.contentService.getTechnologies();
  }

  @Get('faqs')
  async getFaqs() {
    return this.contentService.getFaqs();
  }
}
