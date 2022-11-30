import { Test, TestingModule } from '@nestjs/testing';
import { CardsThemeService } from './cards_theme.service';

describe('CardsThemeService', () => {
  let service: CardsThemeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardsThemeService],
    }).compile();

    service = module.get<CardsThemeService>(CardsThemeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
