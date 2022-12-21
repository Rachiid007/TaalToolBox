import { Test } from '@nestjs/testing';
import { ProficiencyController } from './proficiency.controller';
import { ProficiencyService } from './proficiency.service';

import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('ProficiencyController', () => {
  let controller: ProficiencyController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ProficiencyController],
    })
      .useMocker((token) => {
        if (token === ProficiencyService) {
          return {
            findAll: jest.fn().mockResolvedValue([
              {
                id: 1,
                name: 'Mot inconnu',
                description: 'quand un mot n a pas encore été rencontré',
                weight: 3,
              },
              {
                id: 2,
                name: 'En apprentissage niveau 0/3',
                description:
                  '0/3 réponse correcte sur les trois derniers essais',
                weight: 6,
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

    controller = moduleRef.get<ProficiencyController>(ProficiencyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
