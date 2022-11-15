import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';
import { Users } from 'src/users/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statistic } from './entities/statistic.entity';
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { UsersController } from 'src/users/users.controller';
>>>>>>> c8ce166 (get statistics service)

@Module({
  imports: [TypeOrmModule.forFeature([Users, Statistic]), UsersModule],
  controllers: [StatisticController],
<<<<<<< HEAD
  providers: [StatisticService],
>>>>>>> 59a1eb5 (statistic resources created)
=======
  providers: [StatisticService, UsersService],
  exports: [StatisticService],
>>>>>>> c8ce166 (get statistics service)
=======

@Module({
  imports: [TypeOrmModule.forFeature([Users, Statistic])],
  controllers: [StatisticController],
  providers: [StatisticService],
>>>>>>> b5c54a6 (statistic resources created)
})
export class StatisticModule {}
