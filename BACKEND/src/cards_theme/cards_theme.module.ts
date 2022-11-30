import { Module } from '@nestjs/common';
import { CardsThemeService } from './cards_theme.service';
import { CardsThemeController } from './cards_theme.controller';

@Module({
  controllers: [CardsThemeController],
  providers: [CardsThemeService]
})
export class CardsThemeModule {}
