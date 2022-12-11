import { Test, TestingModule } from '@nestjs/testing';
import { UserResponseController } from './user_response.controller';
import { UserResponseService } from './user_response.service';

import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

const resultFindAll = [
  {
    id: 1,
    response: 'Réponse 1',
    user: {
      id: 1,
      username: 'admin',
      password: 'admin',
      email: 'admin@localhost',
      role: 'admin',
    },
    level: {
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
  },
  {
    id: 2,
    response: 'Réponse 2',
    user: {
      id: 1,
      username: 'admin',
      password: 'admin',
      email: 'admin@localhost',
      role: 'admin',
    },
    level: {
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
  },
];

describe('UserResponseController', () => {
  let controller: UserResponseController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserResponseController],
    })
      .useMocker((token) => {
        if (token === UserResponseService) {
          return {
            findAll: jest.fn().mockResolvedValue(resultFindAll),
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

    controller = moduleRef.get<UserResponseController>(UserResponseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of user responses', async () => {
    expect(await controller.findAll()).toBe(resultFindAll);
  });
});
