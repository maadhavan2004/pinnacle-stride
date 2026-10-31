import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse: any =
      exception instanceof HttpException ? exception.getResponse() : null;

    let title = 'Internal Server Error';
    let detail = 'An unexpected error occurred processing your request.';
    let errors: any = undefined;

    if (exception instanceof HttpException) {
      title = exception.name || 'HTTP Error';
      if (typeof exceptionResponse === 'string') {
        detail = exceptionResponse;
      } else if (exceptionResponse && typeof exceptionResponse === 'object') {
        detail = exceptionResponse.message || detail;
        errors = exceptionResponse.errors;
      }
    } else if (exception instanceof Error) {
      detail = exception.message;
    }

    // RFC 9457 Problem Details format
    const problemDetails = {
      type: `https://pinnaclestride.com/errors/http-${status}`,
      title,
      status,
      detail: Array.isArray(detail) ? detail.join(', ') : detail,
      instance: request.url,
      timestamp: new Date().toISOString(),
      ...(errors && { errors }),
    };

    response.status(status).header('Content-Type', 'application/problem+json').send(problemDetails);
  }
}
