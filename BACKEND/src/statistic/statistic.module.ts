import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';
import { Users } from 'src/users/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statistic } from './entities/statistic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Statistic])],
  controllers: [StatisticController],
  providers: [StatisticService],
})
export class StatisticModule {}
