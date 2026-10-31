import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaService } from './prisma/prisma.service';
import { HealthController } from './modules/health/health.controller';
import { InquiriesService } from './modules/inquiries/inquiries.service';
import { InquiriesController } from './modules/inquiries/inquiries.controller';
import { ContentService } from './modules/content/content.service';
import { ContentController } from './modules/content/content.controller';
import { AuthService } from './modules/auth/auth.service';
import { AuthController } from './modules/auth/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../../.env', '.env'],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100, // 100 requests per minute default
      },
    ]),
  ],
  controllers: [
    HealthController,
    InquiriesController,
    ContentController,
    AuthController,
  ],
  providers: [
    PrismaService,
    InquiriesService,
    ContentService,
    AuthService,
  ],
})
export class AppModule {}
