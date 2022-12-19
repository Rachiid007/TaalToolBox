import { Test } from '@nestjs/testing';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';

import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('ActivityController', () => {
  let controller: ActivityController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ActivityController],
    })
      .useMocker((token) => {
        if (token === ActivityService) {
          return {
            findAll: jest.fn().mockResolvedValue([
              {
                id: 1,
                name: 'Flashcard',
                description: 'Jeu de flashcard pour les élèves',
              },
              {
                id: 2,
                name: 'DragAndDrop',
                description: 'Jeu de drag and drop pour les élèves',
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

    controller = moduleRef.get<ActivityController>(ActivityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
