import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
import { Statistic } from './entities/statistic.entity';

@Injectable()
export class StatisticService {
  constructor(
    @Inject(forwardRef(() => UsersService))
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

  async Get_User_stat(id: number): Promise<object | undefined> {
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
}
function inject() {
  throw new Error('Function not implemented.');
}
