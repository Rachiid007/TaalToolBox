import { LevelMap } from './entities/level_map.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LevelMapService } from './level_map.service';
import { LevelMapController } from './level_map.controller';
import { dragAndDrop } from '../drag_and_drop/entities/drag_and_drop.entity';
import { DragModule } from '../drag_and_drop/drag_and_drop.module';

@Module({
  imports: [TypeOrmModule.forFeature([LevelMap, dragAndDrop]), DragModule],
  controllers: [LevelMapController],
  providers: [LevelMapService],
})
export class LevelMapModule {}
