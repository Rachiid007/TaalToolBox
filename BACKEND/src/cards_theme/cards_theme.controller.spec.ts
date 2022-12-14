import { CardsTheme } from './entities/cards_theme.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { CardsThemeController } from './cards_theme.controller';
import { CardsThemeService } from './cards_theme.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);
describe('CardsThemeController', () => {
  let controller: CardsThemeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardsThemeController],
    })
      .useMocker((token) => {
        if (token === CardsThemeService) {
          return {
            findAll: jest.fn().mockResolvedValue([
              { id: 1, name: 'adjectif' },
              { id: 2, name: 'alimentation' },
            ]),
          };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = module.get<CardsThemeController>(CardsThemeController);
  });

  it('should contain theme', async () => {
    expect(await controller.findAll()).toContainEqual({
      id: 1,
      name: 'adjectif',
    });
  });
});
