import { Module } from '@nestjs/common';
import { DragService } from './drag_and_drop.service';
import { DragController } from './drag_and_drop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dragAndDrop } from './entities/drag_and_drop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([dragAndDrop])],
  controllers: [DragController],
  providers: [DragService],
  exports: [DragService],
})
export class DragModule {}
