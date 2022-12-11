import { Test, TestingModule } from '@nestjs/testing';
import { SchoolclassController } from './schoolclass.controller';
import { SchoolclassService } from './schoolclass.service';

import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

const resultFindAll = [
  {
    id: 1,
    name: 'CM1',
    students: [
      {
        id: 1,
        name: 'Jean',
        firstname: 'Dupont',
        birthdate: '2000-01-01',
      },
      {
        id: 2,
        name: 'Jeanne',
        firstname: 'Dupont',
        birthdate: '2000-01-01',
      },
    ],
  },
  {
    id: 2,
    name: 'CM2',
    students: [
      {
        id: 3,
        name: 'Jean',
        firstname: 'Dupont',
        birthdate: '2000-01-01',
      },
      {
        id: 4,
        name: 'Jeanne',
        firstname: 'Dupont',
        birthdate: '2000-01-01',
      },
    ],
  },
];

describe('SchoolclassController', () => {
  let controller: SchoolclassController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [SchoolclassController],
    })
      .useMocker((token) => {
        if (token === SchoolclassService) {
          return {
            create: jest.fn(),
            findAll: jest.fn().mockResolvedValue(resultFindAll),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
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

    controller = moduleRef.get<SchoolclassController>(SchoolclassController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('should be get all schoolclass in DB', () => {
    it('should be get all schoolclass in DB', async () => {
      const result = await controller.findAll();
      expect(result).toEqual(resultFindAll);
    });
  });
});
