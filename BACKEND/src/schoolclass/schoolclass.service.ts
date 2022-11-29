import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

 /* create(createSchoolclassDto: CreateSchoolclassDto) {
    return 'This action adds a new schoolclass';
  }

  findAll() {
    return `This action returns all schoolclass`;
  }

  findOne(id: number) {
    return `This action returns a #${id} schoolclass`;
  }

  update(id: number, updateSchoolclassDto: UpdateSchoolclassDto) {
    return `This action updates a #${id} schoolclass`;
  }

  remove(id: number) {
    return `This action removes a #${id} schoolclass`;
  }
*/
  async create(data: CreateSchoolclassDto): Promise<any> {
    return await this.schoolClassRepository
      .save(data)
      .then((res) => res)
      .catch((e) => console.log(e));
  }
}
