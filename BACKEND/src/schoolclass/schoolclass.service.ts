import { Schoolclass } from './entities/schoolclass.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSchoolclassDto } from './dto/create-schoolclass.dto';
import { UpdateSchoolclassDto } from './dto/update-schoolclass.dto';

@Injectable()
export class SchoolclassService {
  constructor(
    @InjectRepository(Schoolclass)
    private schoolClassRepository: Repository<Schoolclass>,
  ) {}
  async create(schoolClass: { name: string; schoolId: number }) {
    return await this.schoolClassRepository
      .createQueryBuilder('schoolclass')
      .insert()
      .into('schoolclass', ['name', 'schoolId'])
      .values(schoolClass)
      .execute();
    // return await this.schoolClassRepository.save(createSchoolclassDto);
  }

  findAll() {
    return `This action returns all schoolclass`;
  }

  findOne(id: number) {
    return `This action returns a #${id} schoolclass`;
  }

  async findClassUser(idSchool: number, classUser: string) {
    return await this.schoolClassRepository
      .createQueryBuilder('schoolclass')
      .where({ name: classUser, school: idSchool })
      .getOne();
  }

  update(id: number, updateSchoolclassDto: UpdateSchoolclassDto) {
    return `This action updates a #${id} schoolclass`;
  }

  remove(id: number) {
    return `This action removes a #${id} schoolclass`;
  }
}
