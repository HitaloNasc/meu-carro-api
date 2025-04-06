import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/exceptions/filters/global-exception.filter';
import * as morgan from 'morgan';
import * as cors from 'cors';

async function bootstrap() {
  const port = parseInt(process.env.PORT || '3000', 10);
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'));
  app.use(cors());

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
