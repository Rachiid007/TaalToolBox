import { Test, TestingModule } from '@nestjs/testing';
import { LevelDifficultyService } from './level_difficulty.service';

describe('LevelDifficultyService', () => {
  let service: LevelDifficultyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LevelDifficultyService],
    }).compile();

    service = module.get<LevelDifficultyService>(LevelDifficultyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
