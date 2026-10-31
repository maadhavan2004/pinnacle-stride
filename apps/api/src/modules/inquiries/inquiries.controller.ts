import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Query,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { InquiriesService } from './inquiries.service';
import { InquiryStatus } from '@ps/schemas';

@Controller('inquiries')
export class InquiriesController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  @Post()
  async submitInquiry(@Body() body: any, @Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const ip = req.ip || req.headers['x-forwarded-for']?.toString() || '127.0.0.1';
    const userAgent = req.headers['user-agent']?.toString();
    const result = await this.inquiriesService.create(body, ip, userAgent);
    return res.status(HttpStatus.CREATED).send(result);
  }

  // Admin Inquiries Endpoints
  @Get('admin')
  async listAdmin(
    @Query('status') status?: string,
    @Query('serviceType') serviceType?: string,
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ) {
    return this.inquiriesService.findAll({ status, serviceType, search, page, limit });
  }

  @Get('admin/export.csv')
  async exportCsv(@Res() res: FastifyReply) {
    const csvData = await this.inquiriesService.exportCsv();
    return res
      .header('Content-Type', 'text/csv')
      .header('Content-Disposition', `attachment; filename="pinnaclestride_inquiries_${Date.now()}.csv"`)
      .send(csvData);
  }

  @Get('admin/:id')
  async getAdminOne(@Param('id') id: string) {
    return this.inquiriesService.findOne(id);
  }

  @Patch('admin/:id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: InquiryStatus) {
    return this.inquiriesService.updateStatus(id, status);
  }

  @Post('admin/:id/notes')
  async addNote(@Param('id') id: string, @Body('body') body: string) {
    return this.inquiriesService.addNote(id, body);
  }
}
