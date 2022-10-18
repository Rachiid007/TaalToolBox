import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActivitiesModule } from './activities/activities.module';
import { CardsModule } from './cards/cards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './Auth/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ActivitiesModule,
    CardsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: process.env.POSTGRES_PASSWORD,
      database: 'language_project',
      autoLoadEntities: true,
      synchronize: true, // ! SET TO FALSE IN PRODUCTION
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(/**Middleware function
       */)
      .exclude(
        { path: 'cards', method: RequestMethod.GET },
        { path: 'cards', method: RequestMethod.PATCH },
        { path: 'cards', method: RequestMethod.DELETE },
        'cards/(.*)',
      )
      .forRoutes('cards/upload');
  }
}
