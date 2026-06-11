import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import {
  PrismaExceptionFilter,
  PrismaValidationExceptionFilter,
} from '@/prisma/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = app.get(ConfigService);
  const port = config.get<number>('PORT', 3000);

  // Global prefix
  app.setGlobalPrefix('api');

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Exceptions
  app.useGlobalFilters(new PrismaExceptionFilter(), new PrismaValidationExceptionFilter());

  // CORS
  app.enableCors({
    origin: config.get('CORS_ORIGIN', 'http://localhost:5173'),
    credentials: true,
  });

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Menu Planner API')
    .setDescription('API для планирования меню и подсчёта продуктов')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port, '0.0.0.0');
  Logger.log(`🚀 API running on http://localhost:${port}/api`, 'Bootstrap');
  Logger.log(`📖 Swagger: http://localhost:${port}/api/docs`, 'Bootstrap');
}

bootstrap();
