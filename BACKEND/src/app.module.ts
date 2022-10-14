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
import { CategoryModule } from './category/category.module';
import { LangModule } from './lang/lang.module';
import { RoleModule } from './role/role.module';
import { AnswerModule } from './answer/answer.module';
<<<<<<< HEAD
import { LearnDomainModule } from './learn_domain/learn_domain.module';
// import { RewardModule } from './reward/reward.module';
=======
>>>>>>> 61d731d ([ADD] answer)

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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MulterModule.register({
      dest: join(__dirname, '..', 'public/images'),
    }),
    CategoryModule,
    LangModule,
    RoleModule,
    AnswerModule,
<<<<<<< HEAD
    LearnDomainModule,
    // RewardModule,
=======
>>>>>>> 61d731d ([ADD] answer)
  ],
  controllers: [AppController],
  providers: [AppService],
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
