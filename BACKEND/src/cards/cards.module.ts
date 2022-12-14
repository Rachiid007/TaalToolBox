import { CardsThemeModule } from './../cards_theme/cards_theme.module';
import { CardsTheme } from './../cards_theme/entities/cards_theme.entity';
import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card, CardsTheme]), CardsThemeModule],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
