import { Test, TestingModule } from '@nestjs/testing';
import { LevelMapService } from './level_map.service';

describe('LevelMapService', () => {
  let service: LevelMapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LevelMapService],
    }).compile();

    service = module.get<LevelMapService>(LevelMapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
