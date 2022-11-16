import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/role/entities/role.entity';
import { Lang } from '../lang/entities/lang.entity';
import { Schoolclass } from '../schoolclass/entities/schoolclass.entity';
import { Users } from './entities/users.entity';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { Statistic } from 'src/statistic/entities/statistic.entity';
import { StatisticService } from 'src/statistic/statistic.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Schoolclass, Lang, Role, Statistic]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
