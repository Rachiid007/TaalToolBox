import { Injectable } from '@nestjs/common';
import { CreateDragDto } from './dto/create-drag_and_drop.dto';
import { UpdateLangDto } from './dto/update-drag_and_drop.dto';

@Injectable()
export class DragService {
  create(createDragDto: CreateDragDto) {
    return 'This action adds a new drag-and-drop ex';
  }

  findAll() {
    return `This action returns all drag-and-drops`;
  }

  findOne(id: number) {
    return `This action returns a #${id} drag-and-drop`;
  }
}