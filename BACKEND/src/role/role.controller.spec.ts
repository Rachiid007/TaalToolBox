import { Test } from '@nestjs/testing';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('RoleController', () => {
  let controller: RoleController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [RoleController],
    })
      .useMocker((token) => {
        if (token === RoleService) {
          return {
            findAll: jest.fn().mockResolvedValue([
              {
                id: 1,
                name: 'admin',
                description: 'Administrateur',
              },
              {
                id: 2,
                name: 'user',
                description: 'Utilisateur',
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

    controller = moduleRef.get<RoleController>(RoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of roles', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([
      {
        id: 1,
        name: 'admin',
        description: 'Administrateur',
      },
      {
        id: 2,
        name: 'user',
        description: 'Utilisateur',
      },
    ]);
  });
});
