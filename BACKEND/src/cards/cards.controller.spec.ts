import { Test } from '@nestjs/testing';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

import type { Card } from 'src/types';
describe('CardsController', () => {
  let controller: CardsController;

  const resultFindAll: Card[] = [
    {
      id: 1,
      word: 'Cheval',
      translation: 'Horse',
      image: 'cheval',
    },
    {
      id: 2,
      word: 'Chien',
      translation: 'Dog',
      image: 'chien',
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

  describe('should be get all card in DB', () => {
    it('should return an array of cards', async () => {
      expect(await controller.findAll()).toEqual(resultFindAll);
    });
  });

  // describe('should be get one card in DB', () => {
  //   it('should return an array of cards', async () => {
  //     expect(await controller.findOne('1')).toEqual(resultFindAll[0]);
  //   });
  // });
});
