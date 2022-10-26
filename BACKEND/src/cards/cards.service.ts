import { Injectable, NotFoundException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as XLSX from 'xlsx';
import { Card } from './entities/card.entity';
import multer from 'multer';
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
    const card_id = req.body.id

    const url_prev = `${req.protocol}://${req.get('host')}`;

    //creation de l'url vers l'image
    const url_image = `${url_prev}/public/images/cards/${req.file.filename}`


    // console.log(file);
    // console.log(url_image)
    // console.log(card_id)
    
    this.update(parseInt(card_id), {image : url_image})
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
