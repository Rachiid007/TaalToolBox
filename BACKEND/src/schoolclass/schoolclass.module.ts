import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SchoolclassService } from './schoolclass.service';
import { SchoolclassController } from './schoolclass.controller';
import { School } from 'src/school/entities/school.entity';
import { Schoolclass } from './entities/schoolclass.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Schoolclass, School])],
  exports: [TypeOrmModule, SchoolclassService],
  controllers: [SchoolclassController],
  providers: [SchoolclassService],
})
export class SchoolclassModule {}
