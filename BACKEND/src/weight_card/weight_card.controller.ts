import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WeightCardService } from './weight_card.service';
import { CreateWeightCardDto } from './dto/create-weight_card.dto';
import { UpdateWeightCardDto } from './dto/update-weight_card.dto';

@Controller('weight-card')
export class WeightCardController {
  constructor(private readonly weightCardService: WeightCardService) {}

  @Post()
  create(@Body() createWeightCardDto: CreateWeightCardDto) {
    return this.weightCardService.create(createWeightCardDto);
  }

  @Get()
  findAll() {
    return this.weightCardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weightCardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeightCardDto: UpdateWeightCardDto) {
    return this.weightCardService.update(+id, updateWeightCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weightCardService.remove(+id);
  }
}
