import { Test, TestingModule } from '@nestjs/testing';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { Answer } from './entities/answer.entity';
import { Repository } from 'typeorm';

export class AnswerRepository extends Repository<Answer> {}

import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('AnswerController', () => {
  // let answerController: AnswerController;
  // let answerService: AnswerService;
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
    // Attention à bien mettre les dépendances que l'on retrouve dans AnswerService (constructeur)
    // const module: TestingModule = await Test.createTestingModule({
    //   providers: [
    //     {
    //       provide: 'AnswerRepository',
    //       useClass: AnswerRepository,
    //     },
    //     AnswerService,
    //   ],
    //   controllers: [AnswerController],
    // }).compile();
    // answerService = module.get<AnswerService>(AnswerService);
    // answerController = module.get<AnswerController>(AnswerController);
  });
  // answerService = new AnswerService(answerRepository);
  // answerController = new AnswerController(answerService);
  // Test unitaire sur la fonction answer
  describe('findAll', () => {
    it('should return an answer', async () => {
      const result = {
        description: 'Lutilisateur à trouvé la bonne réponse',
        id: 1,
        name: 'Jai trouvé',
        weight: -1,
      };
      // Force la sortie à retourner la sortie que nous voulons (renvoie le résultat que nous voulons dans nos tests)
      // jest.spyOn(answerService, 'findAll').mockImplementation(() => result);
      expect(await controller.findAll()).toContainEqual(result);
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
});
