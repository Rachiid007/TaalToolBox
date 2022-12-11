import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('UsersController', () => {
  let controller: UsersController;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
    })
      .useMocker((token) => {
        if (token === UsersService) {
          return {
            loginUser: jest.fn().mockResolvedValue([
              {
                name: 'admin',
                surname: 'taaltoolbox',
                role: ['Administrateur'],
                email: 'admin@gmail.com',
                birthdate: '1980-01-01',
                phone: '0666777888',
                schoolclass: [],
                school: '',
              },
              {
                name: 'eleve',
                surname: 'taaltoolbox',
                role: ['Elève'],
                email: 'eleve@gmail.com',
                birthdate: '1980-01-01',
                phone: '0666777888',
                schoolclass: ['3TL1'],
                school: 'Institut Don Bosco',
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

    controller = moduleRef.get<UsersController>(UsersController);
    // userController = module.get<UsersController>(UsersController);
    // userService = module.get<UsersService>(UsersService);
  });

  it('Login User : should be return the user data', async () => {
    const user = {
      name: 'admin',
      surname: 'taaltoolbox',
      role: ['Administrateur'],
      email: 'admin@gmail.com',
      birthdate: '1980-01-01',
      phone: '0666777888',
      schoolclass: [],
      school: '',
    };
    // jest.spyOn(userService, 'loginUser').mockImplementation(() => user);
    expect(
      await controller.findByEmail({
        email: 'admin@gmail.com',
        password: 'password',
      }),
    ).toContainEqual(user);
  });
});
