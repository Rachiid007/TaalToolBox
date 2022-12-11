import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDragDto } from './dto/create-drag_and_drop.dto';
import { Repository } from 'typeorm';
import { dragAndDrop } from './entities/drag_and_drop.entity';
// import { UpdateLangDto } from './dto/update-drag_and_drop.dto';

@Injectable()
export class DragService {
  constructor(
    @InjectRepository(dragAndDrop)
    private drag_and_dropRepository: Repository<dragAndDrop>,
  ) {}

  create(createDragDto: CreateDragDto) {
    return this.drag_and_dropRepository.save(createDragDto);
  }

  findAll() {
    return this.drag_and_dropRepository.find();
  }
}
