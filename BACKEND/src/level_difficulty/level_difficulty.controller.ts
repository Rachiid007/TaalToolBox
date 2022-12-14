import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LevelDifficultyService } from './level_difficulty.service';
import { CreateLevelDifficultyDto } from './dto/create-level_difficulty.dto';
import { UpdateLevelDifficultyDto } from './dto/update-level_difficulty.dto';

@Controller('level-difficulty')
export class LevelDifficultyController {
  constructor(
    private readonly levelDifficultyService: LevelDifficultyService,
  ) {}

  @Post()
  create(@Body() createLevelDifficultyDto: CreateLevelDifficultyDto) {
    return this.levelDifficultyService.create(createLevelDifficultyDto);
  }

  @Get()
  findAll() {
    return this.levelDifficultyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.levelDifficultyService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLevelDifficultyDto: UpdateLevelDifficultyDto,
  ) {
    return this.levelDifficultyService.update(+id, updateLevelDifficultyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.levelDifficultyService.remove(+id);
  }
}
