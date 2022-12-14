import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { CreateCardsThemeDto } from './dto/create-cards_theme.dto';
import { UpdateCardsThemeDto } from './dto/update-cards_theme.dto';
import { CardsTheme } from './entities/cards_theme.entity';
import { Repository } from 'typeorm';
import { dataTheme } from './data/data_theme';
@Injectable()
export class CardsThemeService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(CardsTheme)
    private cardsThemeRepository: Repository<CardsTheme>,
  ) {}
  async onApplicationBootstrap() {
    const theme = await this.cardsThemeRepository.find();
    console.log(theme.length);
    console.log(dataTheme.length);
    if (!theme.length) {
      return this.cardsThemeRepository.save(dataTheme);
    } else if (theme.length !== dataTheme.length) {
      // update la table avec les nouveaux themes
      console.log(theme.length, dataTheme.length);
      if (theme.length < dataTheme.length) {
        // Rajouter les nouveaux thème qui sont à la fin du datatheme
        for (let i = theme.length; i < dataTheme.length; i++) {
          this.cardsThemeRepository
            .createQueryBuilder('cards_theme')
            .insert()
            .into('cards_theme')
            .values(dataTheme[i])
            .execute();
        }
        /**
         * Pour l'instant on ne pourra pas retirer un thème de la base de données
         * if (theme.length > dataTheme.length){
         * for (let i = theme.length+1 , i < dataTheme.length ; i++){
         *  this.cardsThemeRepository.createQueryBuilder('cards_theme').insert().into('cards_theme').values(dataTheme[i]).execute()
         * }
         *
         */
      }
    }
  }
  public async findCardTheme(theme: string) {
    return await this.cardsThemeRepository
      .createQueryBuilder('cards_theme')
      .where({ name: theme })
      .getOne();
  }
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
