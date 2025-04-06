import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { logger } from 'src/common/utils/logger';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    const { request, response } = this.getRequestAndResponse(host);
    const errorDetails = this.buildErrorDetails(exception, request);

    logger.error(
      'Global Exception Handler:' + JSON.stringify(errorDetails, null, 2),
    );
    logger.error(exception.stack);

    this.sendErrorResponse(response, errorDetails);
  }

  private getRequestAndResponse(host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    return {
      request: ctx.getRequest<Request>(),
      response: ctx.getResponse<Response>(),
    };
  }

  private buildErrorDetails(exception: any, request: Request) {
    const isHttpException = exception instanceof HttpException;

    return {
      message: exception.response
        ? exception.response.message
        : exception.message,
      error: exception.response ? exception.response.error : exception.error,
      status: isHttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR,
      path: request.url ?? request.baseUrl,
      method: request.method,
      headers: request.headers,
      queryParams: request.query,
      body: request.body,
      ip: request.ip,
      userAgent: request.headers['user-agent'],
      exceptionName: exception.constructor?.name || 'UnknownException',
      // stack: exception.stack || 'Stack trace unavailable',
    };
  }

  private sendErrorResponse(response: Response, errorDetails: any): void {
    response.status(errorDetails.status).json({
      statusCode: errorDetails.status,
      message: errorDetails.message,
      timestamp: errorDetails.timestamp,
      path: errorDetails.path,
      method: errorDetails.method,
    });
  }
}
