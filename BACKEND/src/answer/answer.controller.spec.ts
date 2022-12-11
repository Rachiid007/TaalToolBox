import { Test, TestingModule } from '@nestjs/testing';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';

import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('AnswerController', () => {
  let controller: AnswerController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AnswerController],
    })
      .useMocker((token) => {
        if (token === AnswerService) {
          return {
            findAll: jest.fn().mockResolvedValue([
              {
                id: 1,
                name: 'Jai trouvé',
                description: 'Lutilisateur à trouvé la bonne réponse',
                weight: -1,
              },
              {
                id: 2,
                name: 'Presque trouvé',
                description: 'Lélève à presque trouvé la bonne réponse',
                weight: 0,
              },
              {
                id: 3,
                name: 'Je nai pas trouvé',
                description: 'Lélève na pas trouvé la bonne réponse',
                weight: 1,
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

    controller = moduleRef.get<AnswerController>(AnswerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of answers', async () => {
    const result = [
      {
        id: 1,
        name: 'Jai trouvé',
        description: 'Lutilisateur à trouvé la bonne réponse',
        weight: -1,
      },
      {
        id: 2,
        name: 'Presque trouvé',
        description: 'Lélève à presque trouvé la bonne réponse',
        weight: 0,
      },
      {
        id: 3,
        name: 'Je nai pas trouvé',
        description: 'Lélève na pas trouvé la bonne réponse',
        weight: 1,
      },
    ];
    expect(await controller.findAll()).toEqual(result);
  });
});
