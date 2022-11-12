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
  Req,
  Res,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { imageFileFilter, editFileName } from './image.middleware';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiParam } from '@nestjs/swagger';
import { Cards } from './cards.decorator';
// import { diskStorage } from 'multer';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @Get()
  findAll() {
    return this.cardsService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a card that exists in the database',
    type: Number,
  })
  findOne(@Param('id') id: string) {
    return this.cardsService.findOne(+id);
  }

  @Get(':id_user/:nbrcards')
  @ApiParam({
    name: 'id_user',
    required: true,
    description:
      'Should be an id of a user that exists in the database and has an active session',
    type: Number,
  })
  findMany(
    @Param('id_user') id_user: number,
    @Param('nbrcards') nbrcards: number,
  ) {
    return this.cardsService.findMany(+id_user, +nbrcards);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(+id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardsService.remove(+id);
  }

  //Apply a middleware on image and store the server link in db
  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'public/images/cards');
        },
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  uploadImage(@UploadedFile() file, @Cards() req) {
    return this.cardsService.uploadImage(req, file);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    return this.cardsService.uploadFile(file);
  }
}
