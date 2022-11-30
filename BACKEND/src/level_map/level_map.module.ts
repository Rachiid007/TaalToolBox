import { Module } from '@nestjs/common';
import { LevelMapService } from './level_map.service';
import { LevelMapController } from './level_map.controller';

@Module({
  controllers: [LevelMapController],
  providers: [LevelMapService]
})
export class LevelMapModule {}
