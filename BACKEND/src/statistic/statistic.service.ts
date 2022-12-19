<<<<<<< HEAD
/*import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
=======
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
>>>>>>> c8ce166 (get statistics service)
import { InjectRepository } from '@nestjs/typeorm';
import { stat } from 'fs';
import { Users } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
import { Statistic } from './entities/statistic.entity';



@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(Statistic)
    private userStatRepository: Repository<Statistic>,
  ) {}

  /*create(createStatisticDto: CreateStatisticDto) {
    return 'This action adds a new statistic';
  }*/
  /*
  findAll() {
    return `This action returns all statistic`;
  }*/
  // recuperer les stats d'un users

<<<<<<< HEAD
<<<<<<< HEAD
  /*async Get_User_stat(id: number): Promise<object | undefined> {
=======
  async Get_User_stat(id: number): Promise<object | undefined> {
>>>>>>> c8ce166 (get statistics service)
=======
  /*async Get_User_stat(id: number): Promise<object | undefined> {
>>>>>>> cd0a472 (accomplissement service created)
    const stat = await this.userStatRepository
      .createQueryBuilder('statistics')
      .innerJoinAndSelect('statistics.user', 'user')
      .where('statistics.id = :id', { id: id })
      .getOne();

    if (!stat) {
      throw new NotFoundException();
    }

    const UserStat = {
      id: stat.user,
      nombre_de_parties_flashcards: stat.nombre_parties_flashcards,
      nombre_de_parties_drag: stat.nombre_parties_drag,
    };

    return UserStat;
  }

  /*findOne(id: number) {
    return `This action returns a #${id} statistic`;
  }*/

  /* update(id: number, updateStatisticDto: UpdateStatisticDto) {
    return `This action updates a #${id} statistic`;
  }*/

  /*remove(id: number) {
    return `This action removes a #${id} statistic`;
  }*/
<<<<<<< HEAD
<<<<<<< HEAD

/*function inject() {
=======
=======

  async getStatisticsForUser(userId: number): Promise<any> {
    // Utilisez ici le répository pour récupérer les statistiques d'un utilisateur spécifique à partir de la base de données
    const stat = await this.userStatRepository.findOneBy({
      id: userId,
    });

    console.log(stat);

    /*if (!stat) {
      throw new NotFoundException();
    }*/

    const userStat = {
      id: stat.id,
      Flashcards: stat.nombre_parties_flashcards,
      dragAndDrop: stat.nombre_parties_drag,
    };

    return userStat;
  }
>>>>>>> cd0a472 (accomplissement service created)
}
function inject() {
>>>>>>> c8ce166 (get statistics service)
  throw new Error('Function not implemented.');
}
*/
