import { Injectable } from '@nestjs/common';
import { CreateProficiencyDto } from './dto/create-proficiency.dto';
import { UpdateProficiencyDto } from './dto/update-proficiency.dto';
import { OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Proficiency } from './entities/proficiency.entity';
import { Repository } from 'typeorm';
@Injectable()
export class ProficiencyService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Proficiency)
    private proficiencyRepository: Repository<Proficiency>,
  ) {}

  async onApplicationBootstrap() {
    const proficiency = await this.proficiencyRepository.find();

    if (!proficiency.length) {
      return this.proficiencyRepository.save([
        {
          name: 'Mot inconnu',
          description: 'quand un mot n a pas encore été rencontré',
          weight: 3,
        },
        {
          name: 'En apprentissage niveau 0/3',
          description: '0/3 réponse correcte sur les trois derniers essais',
          weight: 6,
        },
        {
          name: 'En apprentissage niveau 0/3',
          description: '0/3 réponse correcte sur les trois derniers essais',
          weight: 6,
        },
        {
          name: 'En apprentissage niveau 2/3',
          description: '2/3 réponses correctes sur les trois derniers essais',
          weight: 6,
        },
        {
          name: 'Acquis niveau 0/3',
          description: '0/3 réponse correcte sur les trois derniers essais',
          weight: 1,
        },
        {
          name: 'Acquis niveau 1/3',
          description: '1/3 réponse correcte sur les trois derniers essais',
          weight: 1,
        },
        {
          name: 'Acquis niveau 2/3',
          description: '2/3 réponses correctes sur les trois derniers essais',
          weight: 1,
        },
        {
          name: 'Maîtrisé',
          description: 'mot maîtrisé',
          weight: 0,
        },
      ]);
    }
  }
  create(createProficiencyDto: CreateProficiencyDto) {
    return 'This action adds a new proficiency';
  }

  findAll() {
    return `This action returns all proficiency`;
  }

  findOne(id: number) {
    return `This action returns a #${id} proficiency`;
  }

  update(id: number, updateProficiencyDto: UpdateProficiencyDto) {
    return `This action updates a #${id} proficiency`;
  }

  remove(id: number) {
    return `This action removes a #${id} proficiency`;
  }
}
