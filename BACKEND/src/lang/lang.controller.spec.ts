import { Test, TestingModule } from '@nestjs/testing';
import { LangController } from './lang.controller';
import { LangService } from './lang.service';

describe('LangController', () => {
  let controller: LangController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LangController],
      providers: [LangService],
    }).compile();

    controller = module.get<LangController>(LangController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
