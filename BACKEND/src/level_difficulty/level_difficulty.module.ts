import { LevelDifficulty } from './entities/level_difficulty.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LevelDifficultyService } from './level_difficulty.service';
import { LevelDifficultyController } from './level_difficulty.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LevelDifficulty])],
  controllers: [LevelDifficultyController],
  providers: [LevelDifficultyService],
})
export class LevelDifficultyModule {}
