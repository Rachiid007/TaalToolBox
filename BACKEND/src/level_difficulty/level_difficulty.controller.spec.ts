import { Test, TestingModule } from '@nestjs/testing';
import { LevelDifficultyController } from './level_difficulty.controller';
import { LevelDifficultyService } from './level_difficulty.service';

describe('LevelDifficultyController', () => {
  let controller: LevelDifficultyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LevelDifficultyController],
      providers: [LevelDifficultyService],
    }).compile();

    controller = module.get<LevelDifficultyController>(LevelDifficultyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
