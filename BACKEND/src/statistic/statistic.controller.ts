<<<<<<< HEAD
<<<<<<< HEAD
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

=======
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
>>>>>>> b5c54a6 (statistic resources created)
=======
import { Controller, Body, Patch, Param, Delete, Get } from '@nestjs/common';
>>>>>>> 788499c (get statistics service)
import { StatisticService } from './statistic.service';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';

@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  /* @Post()
  create(@Body() createStatisticDto: CreateStatisticDto) {
    return this.statisticService.create(createStatisticDto);
  }*/

  /* @Get()
  findAll() {
    return this.statisticService.findAll();
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b5c54a6 (statistic resources created)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statisticService.findOne(+id);
<<<<<<< HEAD
=======
  }*/
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.statisticService.getStatisticsForUser(+id);
>>>>>>> cd0a472 (accomplissement service created)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStatisticDto: UpdateStatisticDto,
  ) {
=======
=======
  }*/

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.statisticService.Get_User_stat(+id);
>>>>>>> 788499c (get statistics service)
  }

  /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatisticDto: UpdateStatisticDto) {
>>>>>>> b5c54a6 (statistic resources created)
    return this.statisticService.update(+id, updateStatisticDto);
  }*/

  /*@Delete(':id')
  remove(@Param('id') id: string) {
    return this.statisticService.remove(+id);
  }*/
}
