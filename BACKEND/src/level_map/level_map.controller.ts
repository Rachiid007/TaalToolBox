import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LevelMapService } from './level_map.service';
import { CreateLevelMapDto } from './dto/create-level_map.dto';
import { UpdateLevelMapDto } from './dto/update-level_map.dto';

export interface DadPayloadDto {
  mapPayload: CreateLevelMapDto;
  dadPayload: { levelData: string };
}
@Controller('level-map')
export class LevelMapController {
  constructor(private readonly levelMapService: LevelMapService) {}

  @Post()
  // TODO : regarder comment combiner deux types pour un parametre typescript
  async create(@Body() createLevelMapDto: DadPayloadDto) {
    return await this.levelMapService.create(createLevelMapDto);
  }

  @Get()
  findAll() {
    return this.levelMapService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.levelMapService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLevelMapDto: UpdateLevelMapDto,
  ) {
    return this.levelMapService.update(+id, updateLevelMapDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.levelMapService.remove(+id);
  }
}
