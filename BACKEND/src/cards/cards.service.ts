import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as XLSX from 'xlsx';
import { Card } from './entities/card.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
  ) {}

  create(createCardDto: CreateCardDto) {
    const card = this.cardsRepository.create(createCardDto);
    return this.cardsRepository.save(card);
  }

  findAll() {
    return this.cardsRepository.find();
  }

  async findOne(id: number) {
    const card = await this.cardsRepository.findOneBy({ id });
    if (!card) {
      throw new NotFoundException(`Card #${id} not found`);
    }
    return card;
  }

  async findMany(id_user: number, nbrcards: number) {
    const weight_aquis = process.env.weight_aquis;
    const weight_inconnu = process.env.weight_inconnu;
    const weight_apprentissage = process.env.weight_apprentissage;

    const card = this.cardsRepository.query(
      `select  id,word,translation,image,weight from (
          SELECT  card.id as id,card.word as word,card.translation as translation,card.image as image,COALESCE(proficiency.weight, ${weight_inconnu}) as weight 
          FROM public.card 
          left join (select * from public.user_response where id_user=${id_user}) as A on card.id=A.id_card 
          left join public.proficiency on A.id_proficiency=proficiency.id_proficiency   where COALESCE(proficiency.weight, ${weight_inconnu}) in (${weight_inconnu},${weight_apprentissage})   
          union       
          SELECT  card.id as id,card.word as word ,card.translation as translation,card.image as image ,
          proficiency.weight+TRUNC(DATE_PART('day', now()::timestamp - A.date_response::timestamp)/7)+answer.weight as weight FROM public.card    
          left join (select * from public.user_response where user_response.id_user=${id_user}) as A on card.id=A.id_card    
          left join public.proficiency on A.id_proficiency=proficiency.id_proficiency   
          left join public.answer on A.id_answer=answer.id    
          where proficiency.weight=${weight_aquis} )  as t1     
        ORDER BY (Random() * weight) desc limit ${nbrcards};`,
    );
    return card;
  }

  async update(id: number, updateCardDto: UpdateCardDto) {
    const card = await this.cardsRepository.preload({
      id: +id,
      ...updateCardDto,
    });
    if (!card) {
      throw new NotFoundException(`Card #${id} not found`);
    }
    return this.cardsRepository.save(card);
  }

  async remove(id: number) {
    const card = await this.findOne(id);
    return this.cardsRepository.remove(card);
  }

  async uploadFile(file) {
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });

    // Récupère le nom de la première feuille.
    const sheetName = workbook.SheetNames[0];

    // Utilisez la première feuille.
    const sheet = workbook.Sheets[sheetName];

    // Convertit les informations de la feuille en tableau json.
    const rows = XLSX.utils.sheet_to_json(sheet, {
      header: 1,
      defval: null,
    });

    // console.log(rows);

    for (const row of rows) {
      const values = Object.keys(row).map((key) => row[key]);
      const [word, translation] = values;
      const card = { word, translation };
      await this.create(card);
    }

    return rows;
  }
}
