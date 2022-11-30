import { Injectable } from '@nestjs/common';
import { CreateCardsThemeDto } from './dto/create-cards_theme.dto';
import { UpdateCardsThemeDto } from './dto/update-cards_theme.dto';

@Injectable()
export class CardsThemeService {
  create(createCardsThemeDto: CreateCardsThemeDto) {
    return 'This action adds a new cardsTheme';
  }

  findAll() {
    return `This action returns all cardsTheme`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cardsTheme`;
  }

  update(id: number, updateCardsThemeDto: UpdateCardsThemeDto) {
    return `This action updates a #${id} cardsTheme`;
  }

  remove(id: number) {
    return `This action removes a #${id} cardsTheme`;
  }
}
