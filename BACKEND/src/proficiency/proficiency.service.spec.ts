import { Test, TestingModule } from '@nestjs/testing';
import { ProficiencyService } from './proficiency.service';

describe('ProficiencyService', () => {
  let service: ProficiencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProficiencyService],
    }).compile();

    service = module.get<ProficiencyService>(ProficiencyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
