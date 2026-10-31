import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('live')
  live(@Res() res: FastifyReply) {
    return res.status(HttpStatus.OK).send({
      status: 'UP',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  }

  @Get('ready')
  async ready(@Res() res: FastifyReply) {
    try {
      // Ping database
      await this.prisma.$queryRaw`SELECT 1`;
      return res.status(HttpStatus.OK).send({
        status: 'READY',
        database: 'CONNECTED',
        timestamp: new Date().toISOString(),
      });
    } catch (err: any) {
      return res.status(HttpStatus.SERVICE_UNAVAILABLE).send({
        status: 'DEGRADED',
        database: 'DISCONNECTED',
        error: err.message,
        timestamp: new Date().toISOString(),
      });
    }
  }
}
