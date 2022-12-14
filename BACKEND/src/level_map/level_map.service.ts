import { Injectable } from '@nestjs/common';
import { CreateLevelMapDto } from './dto/create-level_map.dto';
import { UpdateLevelMapDto } from './dto/update-level_map.dto';
import { Repository } from 'typeorm';
import { LevelMap } from './entities/level_map.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class LevelMapService {
  constructor(
    @InjectRepository(LevelMap)
    private levelMapRepository: Repository<LevelMap>,
  ) {}
  create(createLevelMapDto: CreateLevelMapDto) {
    return this.levelMapRepository.save(createLevelMapDto);
  }

  findAll() {
    return this.levelMapRepository.find();
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
