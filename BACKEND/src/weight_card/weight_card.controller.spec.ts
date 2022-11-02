import { Test, TestingModule } from '@nestjs/testing';
import { WeightCardController } from './weight_card.controller';
import { WeightCardService } from './weight_card.service';

describe('WeightCardController', () => {
  let controller: WeightCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeightCardController],
      providers: [WeightCardService],
    }).compile();

    controller = module.get<WeightCardController>(WeightCardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
