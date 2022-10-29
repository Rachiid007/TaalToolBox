import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.useStaticAssets(join(__dirname, '..', 'public'), {prefix :"/public/"});
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/public/' });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  // ATTENTION: PROBLÈMES DE SÉCU POTENTIEL AVEC LES CORS
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
