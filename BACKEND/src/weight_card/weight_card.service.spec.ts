import { Test, TestingModule } from '@nestjs/testing';
import { WeightCardService } from './weight_card.service';

describe('WeightCardService', () => {
  let service: WeightCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeightCardService],
    }).compile();

    service = module.get<WeightCardService>(WeightCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
