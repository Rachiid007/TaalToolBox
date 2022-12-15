import { UserResponseModule } from './user_response/user_response.module';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './cards/cards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { LangModule } from './lang/lang.module';
import { RoleModule } from './role/role.module';
import { AnswerModule } from './answer/answer.module';
import { LearnDomainModule } from './learn_domain/learn_domain.module';
import { ProficiencyModule } from './proficiency/proficiency.module';
import { UsersModule } from './users/users.module';
import { SchoolclassModule } from './schoolclass/schoolclass.module';
import { SchoolModule } from './school/school.module';
import { ActivityModule } from './activity/activity.module';
import { DragModule } from './drag_and_drop/drag_and_drop.module';
import { CardsThemeModule } from './cards_theme/cards_theme.module';
import { LevelMapModule } from './level_map/level_map.module';
import { LevelDifficultyModule } from './level_difficulty/level_difficulty.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: 'postgres',
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: false, // ! SET TO FALSE IN PRODUCTION
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/',
    }),
    MulterModule.register({
      dest: join(__dirname, '..', 'public/images'),
    }),
    // Card depend on theme and difficulty
    CardsThemeModule,
    LevelDifficultyModule,
    CardsModule,
    LangModule,
    CategoryModule,
    RoleModule,
    AnswerModule,
    LearnDomainModule,
    // RewardModule,
    SchoolModule,
    SchoolclassModule,
    UsersModule,
    // AuthModule,
    ProficiencyModule,
    ActivityModule,
    DragModule,
    LevelMapModule,
    UserResponseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes('cards/upload');
  }
}
