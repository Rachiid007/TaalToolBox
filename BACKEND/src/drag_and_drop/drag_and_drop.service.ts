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
    console.log(createDragDto);
    return this.drag_and_dropRepository.save(createDragDto);
  }

  findAll() {
    return this.drag_and_dropRepository.find();
  }

  async getDadById(id: number) {
    console.log(id);
    const levelData = await this.drag_and_dropRepository
      .createQueryBuilder('drag_and_drop')
      .where({ levelMapId: id })
      .getOne();
    return levelData;
  }

  async uploadImage(req, file) {
    console.log('into the service');
    console.log(req.file);
    const drag_id = req.body.id;
    // console.log(req);
    const url_prev = `${req.protocol}://${req.get('host')}`;
    const url_image = `${url_prev}/public/images/dal/${req.file.filename}`;
    console.log('into the service => updating');
    console.log(req);
    this.drag_and_dropRepository.update(parseInt(drag_id), {
      image: url_image,
    });
  }
}
