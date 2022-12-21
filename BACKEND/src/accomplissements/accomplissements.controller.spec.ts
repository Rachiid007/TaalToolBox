import { Test, TestingModule } from '@nestjs/testing';
import { AccomplissementsController } from './accomplissements.controller';
import { AccomplissementsService } from './accomplissements.service';

describe('AccomplissementsController', () => {
  let controller: AccomplissementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccomplissementsController],
      providers: [AccomplissementsService],
    }).compile();

    controller = module.get<AccomplissementsController>(
      AccomplissementsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
function beforeEach(arg0: () => Promise<void>) {
  throw new Error('Function not implemented.');
}

function expect(controller: AccomplissementsController) {
  throw new Error('Function not implemented.');
}

