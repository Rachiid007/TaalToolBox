import { Test, TestingModule } from '@nestjs/testing';
import { SchoolclassController } from './schoolclass.controller';
import { SchoolclassService } from './schoolclass.service';

describe('SchoolclassController', () => {
  let controller: SchoolclassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolclassController],
      providers: [SchoolclassService],
    }).compile();

    controller = module.get<SchoolclassController>(SchoolclassController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
