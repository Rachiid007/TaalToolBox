import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccomplissementsService } from './accomplissements.service';
import { CreateAccomplissementDto } from './dto/create-accomplissement.dto';
import { UpdateAccomplissementDto } from './dto/update-accomplissement.dto';

@Controller('accomplissements')
export class AccomplissementsController {
  constructor(private readonly accomplissementsService: AccomplissementsService) {}

  @Post()
  create(@Body() createAccomplissementDto: CreateAccomplissementDto) {
    return this.accomplissementsService.create(createAccomplissementDto);
  }

  @Get()
  findAll() {
    return this.accomplissementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accomplissementsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccomplissementDto: UpdateAccomplissementDto) {
    return this.accomplissementsService.update(+id, updateAccomplissementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accomplissementsService.remove(+id);
  }
}
