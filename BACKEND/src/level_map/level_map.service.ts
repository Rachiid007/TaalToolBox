import { Inject, Injectable } from '@nestjs/common';
import { UpdateLevelMapDto } from './dto/update-level_map.dto';
import { Repository } from 'typeorm';
import { LevelMap } from './entities/level_map.entity';
import { InjectRepository } from '@nestjs/typeorm';
// import { OnApplicationBootstrap } from '@nestjs/common';
import { DragService } from '../drag_and_drop/drag_and_drop.service';
import type { DadPayloadDto } from './level_map.controller';
@Injectable()
export class LevelMapService {
  constructor(
    @InjectRepository(LevelMap)
    private levelMapRepository: Repository<LevelMap>,
  ) {}

  // async onApplicationBootstrap() {
  //   const levelMap = await this.levelMapRepository.find();
  //   if (!levelMap.length) {
  //     return this.levelMapRepository.save([{}, {}, {}]);
  //   }
  // }
  // Inject drag and learn service
  @Inject(DragService)
  private readonly dragService: DragService;

  async create(createLevelMapDto: DadPayloadDto) {
    // Si on a pas d'information sur le dad level
    console.log(createLevelMapDto.dadPayload);
    if (createLevelMapDto.dadPayload.levelData === '') {
      return await this.levelMapRepository.save(createLevelMapDto.mapPayload);
    } else {
      // Insert level to have the id
      const levelMapRequest = await this.levelMapRepository
        .createQueryBuilder('level_map')
        .insert()
        .into('level_map')
        .values(createLevelMapDto.mapPayload)
        .execute();
      const idLevel: number = levelMapRequest.identifiers[0].id;
      // Insert DAD
      console.log('level Data', createLevelMapDto.dadPayload.levelData);
      const dragRequest = await this.dragService.create({
        levelMapId: idLevel,
        levelData: createLevelMapDto.dadPayload.levelData,
        image: '',
      });
      console.log(dragRequest.id);
      return dragRequest.id;
    }
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
