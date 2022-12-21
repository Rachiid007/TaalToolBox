import { AuthModule } from './auth/auth.module';
import { UserResponseModule } from './user_response/user_response.module';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './cards/cards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
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

const isDevelopment = process.env.NODE_ENV === 'development' ? true : false;

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: 5432,
        username: 'postgres',
        password: process.env.POSTGRES_PASSWORD,
        database: configService.get('POSTGRES_DB'),
        autoLoadEntities: true,
        entities: [],
        synchronize: isDevelopment ? true : false,
        // synchronize: true, // ! SET TO FALSE IN PRODUCTION
      }),
    }),
    MulterModule.register({
      dest: join(__dirname, '..', 'public/images'),
    }),
    // Card depend on theme and difficulty
    ActivityModule,
    LangModule,
    AnswerModule,
    RoleModule,
    LearnDomainModule,
    CategoryModule,
    LevelDifficultyModule,
    CardsThemeModule,
    CardsModule,
    UsersModule,
    // AuthModule,
    SchoolModule,
    SchoolclassModule,
    UsersModule,
    AuthModule,
    ProficiencyModule,
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
