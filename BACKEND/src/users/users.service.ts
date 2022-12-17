import type { UserData } from './../types/index';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async findOneUser(data: number | any): Promise<Users | undefined> {
    return await this.userRepository.findOne(data);
  }
  // Get the user in database and her role
  async loginUser(
    email: string,
    password: string,
  ): Promise<UserData | undefined> {
    if (!email || !password) {
      throw new NotFoundException();
    }
    //Decrypter le mot de passe du user
    //Get the users and here role
    const user = await this.userRepository
      .createQueryBuilder('users')
      .innerJoinAndSelect('users.role', 'role')
      .where({ email: email, password: password })
      .getOne();
    if (!user) {
      throw new NotFoundException();
    }
    const userData = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      role: user.role.map((x) => {
        return x.name;
      }),
      email: user.email,
      birthdate: user.birthdate,
      phone: user.phone,
    };
    return userData;
  }
  async create(data: CreateUserDto): Promise<any> {
    return await this.userRepository
      .save(data)
      .then((res) => res)
      .catch((e) => console.log(e));
  }

  //cette fonction permet de recupérer le nombre d'utilisateur inscrit par classe sous la responsabilité d un prof ayant id_user.
  async findSubscriptionStats(id_user: number): Promise<Users | undefined> {
    const subscriptionStats = this.userRepository.query(
      `select school.name || ' - ' ||schoolclass."name" as SchoolClass_name,count(*) from schoolclass
      join users_schoolclass_schoolclass on schoolclass.id=users_schoolclass_schoolclass."schoolclassId"
      join school on school.id = schoolclass."schoolId"
      where school.id in (select schoolclass."schoolId" from schoolclass where schoolclass.id in (select users_schoolclass_schoolclass."schoolclassId" from users_schoolclass_schoolclass where users_schoolclass_schoolclass."usersId"=${id_user}))
      group by school.name,schoolclass.name;`,
    );
    return await subscriptionStats;
  }

  async findActivePlayersCount(id_user: number): Promise<Users | undefined> {
    const subscriptionStats = this.userRepository.query(
      `select A.name,count(*) from
      (select  distinct id_user, schoolclass."name" as name from user_response
            left join users_schoolclass_schoolclass on user_response."id_user"=users_schoolclass_schoolclass."schoolclassId"
          left join schoolclass on schoolclass.id=users_schoolclass_schoolclass."schoolclassId"
            left join school on school.id = schoolclass."schoolId"
            where school.id in (select schoolclass."schoolId" from schoolclass where schoolclass.id in (select users_schoolclass_schoolclass."schoolclassId" from users_schoolclass_schoolclass where users_schoolclass_schoolclass."usersId"=${id_user}))  
        group by id_user,schoolclass.name) as A
        group by A.name`,
    );
    return await subscriptionStats;
  }
}
