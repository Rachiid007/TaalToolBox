import { Injectable } from '@nestjs/common';
import { CreateProficiencyDto } from './dto/create-proficiency.dto';
import { UpdateProficiencyDto } from './dto/update-proficiency.dto';

@Injectable()
export class ProficiencyService {
  create(createProficiencyDto: CreateProficiencyDto) {
    return 'This action adds a new proficiency';
  }

  findAll() {
    return `This action returns all proficiency`;
  }

  findOne(id: number) {
    return `This action returns a #${id} proficiency`;
  }

  update(id: number, updateProficiencyDto: UpdateProficiencyDto) {
    return `This action updates a #${id} proficiency`;
  }

  remove(id: number) {
    return `This action removes a #${id} proficiency`;
  }
}
