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
import { LearnDomainModule } from './learn_domain/learn_domain.module';
import { UserResponseModule } from './user_response/user_response.module';
import { ProficiencyModule } from './proficiency/proficiency.module';
// import { RewardModule } from './reward/reward.module';
import { WeightCardModule } from './weight_card/weight_card.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
// import { AuthModule } from './Auth/auth/auth.module';
import { SchoolclassModule } from './schoolclass/schoolclass.module';
import { SchoolModule } from './school/school.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
    ActivitiesModule,
    CardsModule,
    LangModule,
    CategoryModule,
    LangModule,
    RoleModule,
    AnswerModule,
    LearnDomainModule,
    WeightCardModule,
    // RewardModule,
    SchoolModule,
    SchoolclassModule,
    UsersModule,
    // AuthModule,
    UserResponseModule,
    ProficiencyModule,
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
