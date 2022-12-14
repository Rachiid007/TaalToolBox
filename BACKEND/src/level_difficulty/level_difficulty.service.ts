import { LevelDifficulty } from './entities/level_difficulty.entity';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLevelDifficultyDto } from './dto/create-level_difficulty.dto';
import { UpdateLevelDifficultyDto } from './dto/update-level_difficulty.dto';
import { Repository } from 'typeorm';
@Injectable()
export class LevelDifficultyService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(LevelDifficulty)
    private levelDifficultyRepository: Repository<LevelDifficulty>,
  ) {}
  async onApplicationBootstrap() {
    const levelDifficulty = await this.levelDifficultyRepository.find();
    if (levelDifficulty.length !== 3) {
      return this.levelDifficultyRepository.save([
        {
          description:
            'terme courant, utilisable dans tous les contextes standards',
        },
        {
          description: 'terme moins courant, mais compréhensible par tous',
        },
        {
          description: 'terme spécifique à un domaine technique/spécifique',
        },
      ]);
    }
  }
  create(createLevelDifficultyDto: CreateLevelDifficultyDto) {
    return 'This action adds a new levelDifficulty';
  }

  findAll() {
    return this.levelDifficultyRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} levelDifficulty`;
  }

  update(id: number, updateLevelDifficultyDto: UpdateLevelDifficultyDto) {
    return `This action updates a #${id} levelDifficulty`;
  }

  remove(id: number) {
    return `This action removes a #${id} levelDifficulty`;
  }
}
