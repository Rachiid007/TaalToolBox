import { Test, TestingModule } from '@nestjs/testing';
import { ProficiencyController } from './proficiency.controller';
import { ProficiencyService } from './proficiency.service';

describe('ProficiencyController', () => {
  let controller: ProficiencyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProficiencyController],
      providers: [ProficiencyService],
    }).compile();

    controller = module.get<ProficiencyController>(ProficiencyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
