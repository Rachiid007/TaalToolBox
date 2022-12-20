import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';
import { Users } from 'src/users/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statistic } from './entities/statistic.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { UsersController } from 'src/users/users.controller';
import { SchoolService } from 'src/school/school.service';
import { SchoolclassModule } from 'src/schoolclass/schoolclass.module';
import { SchoolModule } from 'src/school/school.module';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Statistic, SchoolService]),
    UsersModule,
    SchoolclassModule,
    SchoolModule,
    RoleModule,
  ],
  controllers: [StatisticController],
  providers: [StatisticService, UsersService],
  exports: [StatisticService],
})
export class StatisticModule {}
