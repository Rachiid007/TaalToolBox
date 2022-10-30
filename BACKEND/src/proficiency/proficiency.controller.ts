import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProficiencyService } from './proficiency.service';
import { CreateProficiencyDto } from './dto/create-proficiency.dto';
import { UpdateProficiencyDto } from './dto/update-proficiency.dto';

@Controller('proficiency')
export class ProficiencyController {
  constructor(private readonly proficiencyService: ProficiencyService) {}

  @Post()
  create(@Body() createProficiencyDto: CreateProficiencyDto) {
    return this.proficiencyService.create(createProficiencyDto);
  }

  @Get()
  findAll() {
    return this.proficiencyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proficiencyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProficiencyDto: UpdateProficiencyDto) {
    return this.proficiencyService.update(+id, updateProficiencyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proficiencyService.remove(+id);
  }
}
