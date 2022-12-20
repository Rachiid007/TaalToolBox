import { Test, TestingModule } from '@nestjs/testing';
import { AccomplissementsService } from './accomplissements.service';

describe('AccomplissementsService', () => {
  let service: AccomplissementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccomplissementsService],
    }).compile();

    service = module.get<AccomplissementsService>(AccomplissementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
