import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { urlencoded, json } from 'express';
import * as session from 'express-session';
import * as passport from 'passport';

import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.use(cookieParser(process.env.JWT_SECRET));

  app.use(
    session({
      secret: process.env.JWT_SECRET,
      resave: false,
      saveUninitialized: false,
      // cookie: { maxAge: 3600000, signed: true },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  // app.useStaticAssets(join(__dirname, '..', 'public'), {prefix :"/public/"});
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  // app.use(json({ limit: '50mb' }));
  // app.use(urlencoded({ extended: true, limit: '50mb' }));
  const config = new DocumentBuilder()
    .setTitle('TaalToolBox API')
    .setDescription('TaalToolBox API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // ATTENTION: PROBLÈMES DE SÉCU POTENTIEL AVEC LES CORS
  const options = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders:
      'Content-Type, Accept,Access-Control-Allow-Origin, Access-Control-Allow-Credentials,x-xsrf-token',
  };
  app.enableCors(options);
  await app.listen(3000);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
}
bootstrap();
