import { Test, TestingModule } from '@nestjs/testing';
import { LangService } from './lang.service';

describe('LangService', () => {
  let service: LangService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LangService],
    }).compile();

    service = module.get<LangService>(LangService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
