import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { School } from 'src/school/entities/school.entity';
import { Repository } from 'typeorm';
import { CreateSchoolclassDto } from './dto/create-schoolclass.dto';
import { UpdateSchoolclassDto } from './dto/update-schoolclass.dto';
import { Schoolclass } from './entities/schoolclass.entity';

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
    // return this.schoolClassRepository.find();
    return this.schoolClassRepository
      .createQueryBuilder('schoolclass')
      .leftJoinAndSelect(School, 'school', 'schoolclass.schoolId = school.id ')
      .getMany();
  }

  findOne(id: number) {
    return this.schoolClassRepository
      .createQueryBuilder('schoolclass')
      .where({ id: id })
      .getOne();
  }

  async findClassUser(idSchool: number, classUser: string) {
    return await this.schoolClassRepository
      .createQueryBuilder('schoolclass')
      .where({ name: classUser, schoolId: idSchool })
      .getOne();
  }

  update(id: number, updateSchoolclassDto: UpdateSchoolclassDto) {
    return `This action updates a #${id} schoolclass`;
  }

  remove(id: number) {
    return `This action removes a #${id} schoolclass`;
  }
}
