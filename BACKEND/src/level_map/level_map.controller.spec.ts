import { Test, TestingModule } from '@nestjs/testing';
import { LevelMapController } from './level_map.controller';
import { LevelMapService } from './level_map.service';

import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
const moduleMocker = new ModuleMocker(global);

describe('LevelMapController', () => {
  let controller: LevelMapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LevelMapController],
    })
      .useMocker((token) => {
        if (token === LevelMapService) {
          return {
            findAll: jest.fn().mockResolvedValue([
              {
                id: 6,
                name: 'combo',
                description: 'combo',
                address: "Rue de l'Église Saint-Gilles, 1060, Saint-Gilles",
                position: [4.3423450199618685, 50.83179500691212],
                activityId: 3,
                difficultyId: 1,
                themeId: 7,
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

    controller = module.get<LevelMapController>(LevelMapController);
  });

  it('should contain level map', async () => {
    expect(await controller.findAll()).toContainEqual({
      id: 6,
      name: 'combo',
      description: 'combo',
      address: "Rue de l'Église Saint-Gilles, 1060, Saint-Gilles",
      position: [4.3423450199618685, 50.83179500691212],
      activityId: 3,
      difficultyId: 1,
      themeId: 7,
    });
  });
});
