import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SchoolclassService } from './schoolclass.service';
import { CreateSchoolclassDto } from './dto/create-schoolclass.dto';
import { UpdateSchoolclassDto } from './dto/update-schoolclass.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('schoolclass')
export class SchoolclassController {
  constructor(private readonly schoolclassService: SchoolclassService) {}

  @Post()
  create(@Body() createSchoolclassDto: CreateSchoolclassDto) {
    return this.schoolclassService.create(createSchoolclassDto);
  }
  /*
  @Get()
  findAll() {
    return this.schoolclassService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolclassService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSchoolclassDto: UpdateSchoolclassDto,
  ) {
    return this.schoolclassService.update(+id, updateSchoolclassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schoolclassService.remove(+id);
  }
  */
}
