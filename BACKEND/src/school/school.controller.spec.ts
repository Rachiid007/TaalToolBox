import { Test, TestingModule } from '@nestjs/testing';
import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';

import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

const resultFindAll = [
  {
    id: 1,
    name: 'Ecole 1',
    description: 'Ecole 1',
    address: 'Adresse 1',
    phone: '01 02 03 04 05',
    email: 'ecole1@localhost',
    website: 'http://localhost',
    logo: 'logo1.png',
    lang: {
      id: 1,
      name: 'Français',
      description: 'Langue française',
    },
  },
  {
    id: 2,
    name: 'Ecole 2',
    description: 'Ecole 2',
    address: 'Adresse 2',
    phone: '01 02 03 04 05',
    email: 'ecole2@localhost',
    website: 'http://localhost',
    logo: 'logo2.png',
    lang: {
      id: 1,
      name: 'Français',
      description: 'Langue française',
    },
  },
];

describe('SchoolController', () => {
  let controller: SchoolController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [SchoolController],
    })
      .useMocker((token) => {
        if (token === SchoolService) {
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

    controller = moduleRef.get<SchoolController>(SchoolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of schools', async () => {
    const result = await controller.findAll();
    expect(result).toEqual(resultFindAll);
  });
});
