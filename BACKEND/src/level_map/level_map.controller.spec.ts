import { Test, TestingModule } from '@nestjs/testing';
import { LevelMapController } from './level_map.controller';
import { LevelMapService } from './level_map.service';

describe('LevelMapController', () => {
  let controller: LevelMapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LevelMapController],
      providers: [LevelMapService],
    }).compile();

    controller = module.get<LevelMapController>(LevelMapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
