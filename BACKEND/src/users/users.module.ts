import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../role/entities/role.entity';
import { Lang } from '../lang/entities/lang.entity';
import { Schoolclass } from '../schoolclass/entities/schoolclass.entity';
import { Users } from './entities/users.entity';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { Statistic } from 'src/statistic/entities/statistic.entity';
=======
import { Statistic } from 'src/statistic/entities/statistic.entity';
import { StatisticService } from 'src/statistic/statistic.service';
>>>>>>> c8ce166 (get statistics service)

>>>>>>> de881d2 (get statistics service)
import { SchoolModule } from '../school/school.module';
import { SchoolclassModule } from '../schoolclass/schoolclass.module';
import { RoleModule } from '../role/role.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Schoolclass, Lang, Role, Statistic]),
<<<<<<< HEAD
    SchoolModule,
    SchoolclassModule,
    RoleModule,
=======
import { Statistic } from 'src/statistic/entities/statistic.entity';
import { StatisticService } from 'src/statistic/statistic.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Schoolclass, Lang, Role, Statistic]),
>>>>>>> c8ce166 (get statistics service)
=======
>>>>>>> c8ce166 (get statistics service)
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
