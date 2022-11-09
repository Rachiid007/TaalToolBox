import { Activity } from './entities/activity.entity';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Repository } from 'typeorm';
@Injectable()
export class ActivityService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}
  async onApplicationBootstrap() {
    const activity = await this.activityRepository.find();

    if (!activity.length) {
      return this.activityRepository.save([
        {
          name: 'Flashcard',
          description: 'Jeu de flashcard pour les élèves',
        },
        {
          name: 'DragAndDrop',
          description: 'Jeu de drag and drop pour les élèves',
        },
      ]);
    }
  }
  create(createActivityDto: CreateActivityDto) {
    return 'This action adds a new activity';
  }

  findAll() {
    return `This action returns all activity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} activity`;
  }

  update(id: number, updateActivityDto: UpdateActivityDto) {
    return `This action updates a #${id} activity`;
  }

  remove(id: number) {
    return `This action removes a #${id} activity`;
  }
}
