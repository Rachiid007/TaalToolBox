import { Test, TestingModule } from '@nestjs/testing';
import { DragController } from './drag_and_drop.controller';
import { DragService } from './drag_and_drop.service';

import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('LangController', () => {
  let controller: DragController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [DragController],
    })
      .useMocker((token) => {
        if (token === DragService) {
          return {
            findAll: jest.fn().mockResolvedValue([
              {
                id: 1,
                levelData: {
                  id: 1,
                  name: 'Niveau 1',
                  description: 'Niveau 1',
                  level: 1,
                  lang: {
                    id: 1,
                    name: 'Français',
                    description: 'Langue française',
                  },
                },
                levelName: 'Niveau 1',
                creator: 'admin',
              },
              {
                id: 2,
                levelData: {
                  id: 2,
                  name: 'Niveau 2',
                  description: 'Niveau 2',
                  level: 2,
                  lang: {
                    id: 1,
                    name: 'Français',
                    description: 'Langue française',
                  },
                },
                levelName: 'Niveau 2',
                creator: 'admin',
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

    controller = moduleRef.get<DragController>(DragController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of drag and drop', async () => {
    expect(await controller.findAll()).toEqual([
      {
        id: 1,
        levelData: {
          id: 1,
          name: 'Niveau 1',
          description: 'Niveau 1',
          level: 1,
          lang: {
            id: 1,
            name: 'Français',
            description: 'Langue française',
          },
        },
        levelName: 'Niveau 1',
        creator: 'admin',
      },
      {
        id: 2,
        levelData: {
          id: 2,
          name: 'Niveau 2',
          description: 'Niveau 2',
          level: 2,
          lang: {
            id: 1,
            name: 'Français',
            description: 'Langue française',
          },
        },
        levelName: 'Niveau 2',
        creator: 'admin',
      },
    ]);
  });
});
