import { LevelMap } from './entities/level_map.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LevelMapService } from './level_map.service';
import { LevelMapController } from './level_map.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LevelMap])],
  controllers: [LevelMapController],
  providers: [LevelMapService],
})
export class LevelMapModule {}
