import { Lang } from './entities/lang.entity';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLangDto } from './dto/create-lang.dto';
import { UpdateLangDto } from './dto/update-lang.dto';
import { Repository } from 'typeorm';
@Injectable()
export class LangService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Lang)
    private langRepository: Repository<Lang>,
  ) {}
  async onApplicationBootstrap() {
    const lang = await this.langRepository.find();
    if (!lang.length) {
      return this.langRepository.save([
        {
          name: 'français',
          code: 'fr',
        },
        {
          name: 'english',
          code: 'en',
        },
        {
          name: 'netherlands',
          code: 'nl',
        },
      ]);
    }
  }
  create(createLangDto: CreateLangDto) {
    return this.langRepository.save(createLangDto);
  }

  findAll() {
    return this.langRepository.find();
  }

  // findOne(id: number) {
  //   return this.langRepository.findOne(id);
  // }

  update(id: number, updateLangDto: UpdateLangDto) {
    return this.langRepository.update(id, updateLangDto);
  }

  remove(id: number) {
    return this.langRepository.delete(id);
  }
}
