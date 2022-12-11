import { Test } from '@nestjs/testing';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

describe('CardsController', () => {
  let controller: CardsController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CardsController],
    })
      .useMocker((token) => {
        if (token === CardsService) {
          return {
            create: jest.fn(),
            findAll: jest.fn(() => [
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
            ]),
            findOne: jest.fn(),
            findMany: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          };
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
      const result = [
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
      expect(await controller.findAll()).toEqual(result);
    });
  });
});
