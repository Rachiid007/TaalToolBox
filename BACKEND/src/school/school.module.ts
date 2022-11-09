import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { School } from './entities/school.entity';
@Module({
  imports: [TypeOrmModule.forFeature([School])],
  exports: [TypeOrmModule, SchoolService],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
