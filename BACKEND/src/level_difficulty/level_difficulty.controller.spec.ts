import { Test, TestingModule } from '@nestjs/testing';
import { LevelDifficultyController } from './level_difficulty.controller';
import { LevelDifficultyService } from './level_difficulty.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
const moduleMocker = new ModuleMocker(global);
describe('LevelDifficultyController', () => {
  let controller: LevelDifficultyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LevelDifficultyController],
    })
      .useMocker((token) => {
        if (token === LevelDifficultyService) {
          return {
            findAll: jest.fn().mockResolvedValue([
              {
                id: 1,
                description:
                  'terme courant, utilisable dans tous les contextes standards',
              },
              {
                id: 2,
                description:
                  'terme moins courant, mais compréhensible par tous',
              },
              {
                id: 3,
                description:
                  'terme spécifique à un domaine technique/spécifique',
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

    controller = module.get<LevelDifficultyController>(
      LevelDifficultyController,
    );
  });

  it('should contain difficulty', async () => {
    expect(await controller.findAll()).toContainEqual({
      id: 1,
      description:
        'terme courant, utilisable dans tous les contextes standards',
    });
  });
});
