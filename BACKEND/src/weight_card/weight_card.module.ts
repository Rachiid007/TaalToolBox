import { Module } from '@nestjs/common';
import { WeightCardService } from './weight_card.service';
import { WeightCardController } from './weight_card.controller';

@Module({
  controllers: [WeightCardController],
  providers: [WeightCardService]
})
export class WeightCardModule {}
