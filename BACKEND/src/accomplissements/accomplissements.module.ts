import { Module } from '@nestjs/common';
import { AccomplissementsService } from './accomplissements.service';
import { AccomplissementsController } from './accomplissements.controller';
import { Accomplissements } from './entities/accomplissement.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Accomplissements])],
  controllers: [AccomplissementsController],
  providers: [AccomplissementsService],
})
export class AccomplissementsModule {}
