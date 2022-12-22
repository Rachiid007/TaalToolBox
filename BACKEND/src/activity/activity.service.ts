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
          description:
            "Activité dans laquelle l'étudiant doit trouver de mots et doit s'auto-évaluer. Les mots" +
            'sont representé sous forme de carte. Un systeme de poids est mise en place pour que les' +
            "cartes plus dure de l'élève réaparaissent le plus souvent.",
          src: '@/assets/logo/flashcards.svg',
        },
        {
          name: 'DragAndLearn',
          description:
            "Activité dans laquelle l'étudiant doit placer des mots qui lui seront proposer dans la zone de jeu." +
            ' Dans cette zone de jeu les mots devrons être placés dans des champs et la zone de jeu comportera une image de background.',
          src: '@/assets/logo/dalcard.svg',
        },
        {
          name: 'Verbalize',
          description:
            "Activité dans laquelle l'étudiant pourra apprendre à bien articuler" +
            " Dans cette zone de jeu l'étudiant devra s'enregister pour savoir s'il a bien prononcer le mot proposer.",
          src: '@/assets/logo/verbalize.svg',
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
