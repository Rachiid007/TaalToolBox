import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../role/entities/role.entity';
import { Lang } from '../lang/entities/lang.entity';
import { Schoolclass } from '../schoolclass/entities/schoolclass.entity';
import { Users } from './entities/users.entity';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SchoolModule } from '../school/school.module';
import { SchoolclassModule } from '../schoolclass/schoolclass.module';
import { RoleModule } from '../role/role.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Schoolclass, Lang, Role]),
    SchoolModule,
    SchoolclassModule,
    RoleModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
