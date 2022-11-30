import { Test, TestingModule } from '@nestjs/testing';
import { CardsThemeController } from './cards_theme.controller';
import { CardsThemeService } from './cards_theme.service';

describe('CardsThemeController', () => {
  let controller: CardsThemeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardsThemeController],
      providers: [CardsThemeService],
    }).compile();

    controller = module.get<CardsThemeController>(CardsThemeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
