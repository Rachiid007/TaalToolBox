import { Injectable } from '@nestjs/common';
import { CreateLevelMapDto } from './dto/create-level_map.dto';
import { UpdateLevelMapDto } from './dto/update-level_map.dto';

@Injectable()
export class LevelMapService {
  create(createLevelMapDto: CreateLevelMapDto) {
    return 'This action adds a new levelMap';
  }

  findAll() {
    return `This action returns all levelMap`;
  }

  findOne(id: number) {
    return `This action returns a #${id} levelMap`;
  }

  update(id: number, updateLevelMapDto: UpdateLevelMapDto) {
    return `This action updates a #${id} levelMap`;
  }

  remove(id: number) {
    return `This action removes a #${id} levelMap`;
  }
}
