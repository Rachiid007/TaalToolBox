import { Module } from '@nestjs/common';
import { RewardService } from './reward.service';
import { RewardController } from './reward.controller';

@Module({
  controllers: [RewardController],
  providers: [RewardService]
})
export class RewardModule {}
