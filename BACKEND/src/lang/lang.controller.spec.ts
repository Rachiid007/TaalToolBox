import { Test, TestingModule } from '@nestjs/testing';
import { LangController } from './lang.controller';
import { LangService } from './lang.service';

import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('LangController', () => {
  let controller: LangController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [LangController],
    })
      .useMocker((token) => {
        if (token === LangService) {
          return {
            findAll: jest.fn().mockResolvedValue([
              {
                id: 1,
                name: 'français',
                code: 'fr',
              },
              {
                id: 2,
                name: 'english',
                code: 'en',
              },
              {
                id: 3,
                name: 'netherlands',
                code: 'nl',
              },
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

    controller = moduleRef.get<LangController>(LangController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of languages', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([
      {
        id: 1,
        name: 'français',
        code: 'fr',
      },
      {
        id: 2,
        name: 'english',
        code: 'en',
      },
      {
        id: 3,
        name: 'netherlands',
        code: 'nl',
      },
    ]);
  });
});
