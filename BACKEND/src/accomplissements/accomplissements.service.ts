import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccomplissementDto } from './dto/create-accomplissement.dto';
import { UpdateAccomplissementDto } from './dto/update-accomplissement.dto';
import { Accomplissements } from './entities/accomplissement.entity';

@Injectable()
export class AccomplissementsService {

  constructor(
    @InjectRepository(Accomplissements)
    private accomplissementRepository: Repository<Accomplissements>,
  ) {}
  create(createAccomplissementDto: CreateAccomplissementDto) {
    return 'This action adds a new accomplissement';
  }

  async findAll() {
    const accomplissements = await this.accomplissementRepository.find();

    return accomplissements;
  }

  findOne(id: number) {
    return `This action returns a #${id} accomplissement`;
  }

  update(id: number, updateAccomplissementDto: UpdateAccomplissementDto) {
    return `This action updates a #${id} accomplissement`;
  }

  remove(id: number) {
    return `This action removes a #${id} accomplissement`;
  }
}
