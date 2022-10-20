import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LearnDomainService } from './learn_domain.service';
import { CreateLearnDomainDto } from './dto/create-learn_domain.dto';
import { UpdateLearnDomainDto } from './dto/update-learn_domain.dto';

@Controller('learn-domain')
export class LearnDomainController {
  constructor(private readonly learnDomainService: LearnDomainService) {}

  @Post()
  create(@Body() createLearnDomainDto: CreateLearnDomainDto) {
    return this.learnDomainService.create(createLearnDomainDto);
  }

  @Get()
  findAll() {
    return this.learnDomainService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.learnDomainService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLearnDomainDto: UpdateLearnDomainDto) {
    return this.learnDomainService.update(+id, updateLearnDomainDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.learnDomainService.remove(+id);
  }
}
