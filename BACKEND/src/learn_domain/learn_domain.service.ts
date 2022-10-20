import { Injectable } from '@nestjs/common';
import { CreateLearnDomainDto } from './dto/create-learn_domain.dto';
import { UpdateLearnDomainDto } from './dto/update-learn_domain.dto';

@Injectable()
export class LearnDomainService {
  create(createLearnDomainDto: CreateLearnDomainDto) {
    return 'This action adds a new learnDomain';
  }

  findAll() {
    return `This action returns all learnDomain`;
  }

  findOne(id: number) {
    return `This action returns a #${id} learnDomain`;
  }

  update(id: number, updateLearnDomainDto: UpdateLearnDomainDto) {
    return `This action updates a #${id} learnDomain`;
  }

  remove(id: number) {
    return `This action removes a #${id} learnDomain`;
  }
}
