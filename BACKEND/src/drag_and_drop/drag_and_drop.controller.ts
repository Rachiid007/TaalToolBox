import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { imageFileFilter, editFileName } from './image.middleware';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiParam } from '@nestjs/swagger';
import { DragService } from './drag_and_drop.service';
import { CreateDragDto } from './dto/create-drag_and_drop.dto';
import { fileURLToPath } from 'url';
import { Dals } from './drag.decorator';
// import { UpdateDragDto } from './dto/update-drag_and_drop.dto';

@Controller('drag_and_drop')
export class DragController {
  constructor(private readonly dragService: DragService) {}

  @Post()
  create(@Body() createDragDto: CreateDragDto) {
    console.log(createDragDto);
    return this.dragService.create(createDragDto);
  }

  @Get()
  findAll() {
    return this.dragService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.dragService.findOne(+id);
  // }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dragService.findOne(+id);
  }

  @Post('image')
  // Ajoute le fichier (l'image) dans le backend
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'public/images/dal');
        },
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  // Ajoute le lien vers l'image dans la DB
  uploadImage(@UploadedFile() file, @Dals() req) {
    return this.dragService.uploadImage(req, file);
  }
}
