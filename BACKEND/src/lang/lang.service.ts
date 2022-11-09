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
    return 'This action adds a new lang';
  }

  findAll() {
    return `This action returns all lang`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lang`;
  }

  update(id: number, updateLangDto: UpdateLangDto) {
    return `This action updates a #${id} lang`;
  }

  remove(id: number) {
    return `This action removes a #${id} lang`;
  }
}
