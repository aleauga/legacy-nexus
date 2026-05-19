import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './presentation/app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  app.enableCors();
  
  // Servir archivos estáticos
  app.useStaticAssets(join(process.cwd(), '../frontend/static'), {
    index: false,
    extensions: ['html'],
  });
  
  await app.listen(3000, '0.0.0.0');
  console.log('Application is running on http://0.0.0.0:3000');
}

bootstrap();
