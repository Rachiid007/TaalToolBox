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
    return this.activityRepository.save(createActivityDto);
  }

  findAll() {
    return this.activityRepository.find();
  }

  update(id: number, updateActivityDto: UpdateActivityDto) {
    return this.activityRepository.update(id, updateActivityDto);
  }

  remove(id: number) {
    return this.activityRepository.delete(id);
  }
}
