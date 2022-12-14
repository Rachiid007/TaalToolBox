import { CardsThemeService } from './../cards_theme/cards_theme.service';
import { dataCard } from './data/cards';
import {
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
  Inject,
} from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as XLSX from 'xlsx';
import { Card } from './entities/card.entity';
@Injectable()
export class CardsService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
  ) {}
  @Inject(CardsThemeService)
  private readonly cardsThemeService: CardsThemeService;

  async onApplicationBootstrap() {
    const card = await this.cardsRepository.find();
    if (!card.length) {
      // return this.cardsRepository.save(dataCard);
      for (let i = 0; i < dataCard.length; i++) {
        await this.insertCard(dataCard[i]);
      }
    } else if (card.length === dataCard.length) {
      for (let i = card.length; i < dataCard.length; i++) {
        await this.insertCard(dataCard[i]);
        // const insertCard = await this.cardsRepository
        //   .createQueryBuilder('cards')
        //   .insert()
        //   .into('cards', ['word', 'translation', 'difficultyId'])
        //   .values({
        //     word: dataCard[i].word,
        //     translation: dataCard[i].translation,
        //     difficultyId: dataCard[i].difficultyId,
        //   })
        //   .execute();
        // const idInsertCard = insertCard.identifiers[0].id;
        // for (let j = 0; j < dataCard[i].theme.length; j++) {
        //   // Recupérer les id des theme
        //   const cardThemeRequest = await this.cardsThemeService.findCardTheme(
        //     dataCard[i].theme[j],
        //   );
        //   const idCardTheme = cardThemeRequest.id;
        //   const insertCardTheme = await this.cardsRepository
        //     .createQueryBuilder()
        //     .insert()
        //     .into('card_cardstheme_cards_theme')
        //     .values({ cardId: idInsertCard, cardsThemeId: idCardTheme })
        //     .execute()
        //     .catch((err) => console.error(err));
        //   console.log(insertCardTheme);
        // }
      }
    }
  }
  async insertCard(dataCard: {
    word: string;
    translation: string;
    difficultyId: number;
    theme: string[];
  }) {
    const insertCard = await this.cardsRepository
      .createQueryBuilder('card')
      .insert()
      .into('card', ['word', 'translation', 'difficultyId'])
      .values({
        word: dataCard.word,
        translation: dataCard.translation,
        difficultyId: dataCard.difficultyId,
      })
      .execute();
    const idInsertCard = insertCard.identifiers[0].id;
    for (let j = 0; j < dataCard.theme.length; j++) {
      // Recupérer les id des theme
      const cardThemeRequest = await this.cardsThemeService.findCardTheme(
        dataCard.theme[j],
      );
      console.log(cardThemeRequest);
      const idCardTheme = cardThemeRequest.id;
      const insertCardTheme = await this.cardsRepository
        .createQueryBuilder()
        .insert()
        .into('card_cardstheme_cards_theme')
        .values({ cardId: idInsertCard, cardsThemeId: idCardTheme })
        .execute()
        .catch((err) => console.error(err));
    }
  }
  create(createCardDto: CreateCardDto) {
    const card = this.cardsRepository.create(createCardDto);
    console.log('Service : ', card);
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

  //Cette fonction permet de récuperer des cartes pour un nouveau jeux selon leurs poids, le calcul du poids est basé sur proficiency.weight et answer.weight
  async findMany(id_user: number, nbrcards: number) {
    const weight_aquis = process.env.weight_aquis;
    const weight_inconnu = process.env.weight_inconnu;
    const weight_apprentissage = process.env.weight_apprentissage;

    //cette requête permet de recupérer nbrcards cartes pour l'utilisateur id_user selon les critères Inconnu, en appretissage ou aquis.
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

  async uploadImage(req, file) {
    //req -- id est dans req.body.id
    const card_id = req.body.id;

    const url_prev = `${req.protocol}://${req.get('host')}`;

    //creation de l'url vers l'image
    const url_image = `${url_prev}/public/images/cards/${req.file.filename}`;

    // console.log(file);
    // console.log(url_image)
    // console.log(card_id)

    this.update(parseInt(card_id), { image: url_image });
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
      const [word, translation, image] = values;
      const card = { word, translation, image };
      await this.create(card);
    }

    return rows;
  }
}
