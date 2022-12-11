import { Test } from '@nestjs/testing';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('CardsController', () => {
  let controller: CardsController;

  const resultFindAll = [
    {
      id: 1,
      word: 'word1',
      translation: 'translation1',
      image: 'image1',
    },
    {
      id: 2,
      word: 'word2',
      translation: 'translation2',
      image: 'image2',
    },
  ];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CardsController],
    })
      .useMocker((token) => {
        if (token === CardsService) {
          return {
            create: jest.fn(),
            findAll: jest.fn().mockResolvedValue(resultFindAll),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
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

    controller = moduleRef.get<CardsController>(CardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of cards', async () => {
      expect(await controller.findAll()).toEqual(resultFindAll);
    });
  });
});
