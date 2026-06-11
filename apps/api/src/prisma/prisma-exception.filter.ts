import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusMap: Record<string, number> = {
      P2002: HttpStatus.CONFLICT,
      P2025: HttpStatus.NOT_FOUND,
      P2003: HttpStatus.BAD_REQUEST,
    };

    const status = statusMap[exception.code] ?? HttpStatus.INTERNAL_SERVER_ERROR;
    response.status(status).json({
      statusCode: status,
      message: exception.message,
      code: exception.code,
    });
  }
}

@Catch(PrismaClientValidationError)
export class PrismaValidationExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaValidationExceptionFilter.name);

  catch(exception: PrismaClientValidationError, host: ArgumentsHost) {
    this.logger.error(exception.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: exception.message,
    });
  }
}
