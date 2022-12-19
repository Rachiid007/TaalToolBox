import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CardsThemeService } from './cards_theme.service';
import { CreateCardsThemeDto } from './dto/create-cards_theme.dto';
import { UpdateCardsThemeDto } from './dto/update-cards_theme.dto';

@Controller('cards-theme')
export class CardsThemeController {
  constructor(private readonly cardsThemeService: CardsThemeService) {}

  @Post()
  create(@Body() createCardsThemeDto: CreateCardsThemeDto) {
    return this.cardsThemeService.create(createCardsThemeDto);
  }

  @Get()
  findAll() {
    return this.cardsThemeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardsThemeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCardsThemeDto: UpdateCardsThemeDto,
  ) {
    return this.cardsThemeService.update(+id, updateCardsThemeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardsThemeService.remove(+id);
  }
}
