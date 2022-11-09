import { Activity } from './entities/activity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';

@Module({
  imports : [TypeOrmModule.forFeature([Activity])],
  controllers: [ActivityController],
  providers: [ActivityService]
})
export class ActivityModule {}
