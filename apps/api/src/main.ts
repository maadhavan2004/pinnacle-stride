import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: {
        level: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
      },
    })
  );

  // Global prefix: /api/v1 (Document 5 §5.4)
  app.setGlobalPrefix('api/v1');

  // Global RFC 9457 exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Enable CORS for web client (Vercel, custom domains, and local dev)
  const configuredOrigins = (process.env.APP_URL || 'http://localhost:3000')
    .split(',')
    .map((o) => o.trim());
  configuredOrigins.push('http://127.0.0.1:3000', 'http://localhost:3000');

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (
        configuredOrigins.includes(origin) ||
        origin.endsWith('.vercel.app') ||
        process.env.NODE_ENV !== 'production'
      ) {
        return callback(null, true);
      }
      return callback(new Error(`CORS origin not allowed: ${origin}`), false);
    },
    credentials: true,
  });

  // OpenAPI / Swagger Documentation at /api/docs
  const config = new DocumentBuilder()
    .setTitle('PinnacleStride API')
    .setDescription('REST API for PinnacleStride public website and operations portal')
    .setVersion('1.0')
    .addTag('health', 'Liveness & readiness probes')
    .addTag('inquiries', 'Lead and inquiry management')
    .addTag('content', 'Public services, projects, products, and team')
    .addTag('auth', 'Administrative session authentication')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = Number(process.env.PORT) || 4000;
  await app.listen(port, '0.0.0.0');
  console.log(`PinnacleStride API running on: http://localhost:${port}/api/v1`);
  console.log(`API Documentation available at: http://localhost:${port}/api/docs`);
}

bootstrap();
