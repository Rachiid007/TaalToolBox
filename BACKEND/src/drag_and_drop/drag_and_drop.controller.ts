import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DragService } from './drag_and_drop.service';
import { CreateDragDto } from './dto/create-drag_and_drop.dto';

@Controller('drag_and_drop')
export class DragController {
  constructor(private readonly dragService: DragService) {}

  @Post()
  create(@Body() createDragDto: CreateDragDto) {
    return this.dragService.create(createDragDto);
  }

  @Get()
  findAll() {
    return this.dragService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dragService.findOne(+id);
  }
}
