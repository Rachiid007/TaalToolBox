import { Injectable } from '@nestjs/common';
import { CreateSchoolclassDto } from './dto/create-schoolclass.dto';
import { UpdateSchoolclassDto } from './dto/update-schoolclass.dto';

@Injectable()
export class SchoolclassService {
  create(createSchoolclassDto: CreateSchoolclassDto) {
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
}
