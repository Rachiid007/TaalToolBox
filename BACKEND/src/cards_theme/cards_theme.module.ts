import { CardsTheme } from './entities/cards_theme.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CardsThemeService } from './cards_theme.service';
import { CardsThemeController } from './cards_theme.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CardsTheme])],
  controllers: [CardsThemeController],
  providers: [CardsThemeService],
  exports: [CardsThemeService],
})
export class CardsThemeModule {}
