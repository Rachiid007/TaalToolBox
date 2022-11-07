import { Module } from '@nestjs/common';
import { RewardService } from './reward.service';
import { RewardController } from './reward.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reward } from './entities/reward.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reward])],
  controllers: [RewardController],
  providers: [RewardService],
})
export class RewardModule {}
