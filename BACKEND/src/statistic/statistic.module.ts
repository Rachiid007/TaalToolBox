import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';
import { Users } from 'src/users/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statistic } from './entities/statistic.entity';
<<<<<<< HEAD
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { UsersController } from 'src/users/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Statistic]), UsersModule],
  controllers: [StatisticController],
  providers: [StatisticService, UsersService],
  exports: [StatisticService],
=======

@Module({
  imports: [TypeOrmModule.forFeature([Users, Statistic])],
  controllers: [StatisticController],
  providers: [StatisticService],
>>>>>>> 59a1eb5 (statistic resources created)
})
export class StatisticModule {}
