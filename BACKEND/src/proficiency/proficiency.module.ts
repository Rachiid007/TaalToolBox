import { Module } from '@nestjs/common';
import { ProficiencyService } from './proficiency.service';
import { ProficiencyController } from './proficiency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proficiency } from './entities/proficiency.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proficiency])],
  controllers: [ProficiencyController],
  providers: [ProficiencyService]
})
export class ProficiencyModule {}
