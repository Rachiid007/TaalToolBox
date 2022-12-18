import { CreateUserResponseDto } from './dto/create-user_response.dto';
import { UpdateUserResponseDto } from './dto/update-user_response.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserResponse } from './entities/user_response.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserResponseService {
  constructor(
    @InjectRepository(UserResponse)
    private updateUserResponseDto: Repository<UserResponse>,
  ) {}

  create(createUserResponseDto: CreateUserResponseDto) {
    const card = this.updateUserResponseDto.create(createUserResponseDto);
    return this.updateUserResponseDto.save(card);
  }

  findAll() {
    return this.updateUserResponseDto.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} userResponse`;
  }

  /* Permet d'insérer les réponses au jeu de Flachcard dans la DB et met à jour la 'proficiency': niveau de maîtrise */
  async updateMany(iduser: number, userResponse: object[]) {
    //cette boucle permet de parcourir la response
    for (let i = 0; i < userResponse.length; i++) {
      //Lire la dernière réponse de la DB
      const user_response = await this.updateUserResponseDto.findOne({
        where: {
          id_user: iduser,
          id_card: userResponse[i]['id_card'],
        },
      });
      //Insérer une nouvelle réponse
      if (!user_response) {
        let id_p;
        userResponse[i]['id_answer'] == 1 ? (id_p = 2) : (id_p = 1);
        const newuser_response = {
          date_response: new Date(),
          id_user: iduser,
          id_card: userResponse[i]['id_card'],
          id_answer: userResponse[i]['id_answer'],
          id_proficiency: id_p,
        };

        await this.create(newuser_response);
      } else {
        //changer date de réponse pour mettre la date actuelle
        user_response.date_response = new Date();
        //changer answer_id avec celle réçu
        user_response.id_answer = userResponse[i]['id_answer'];
        //mise à jour de proficiency
        if (user_response.id_answer == 1) {
          //Si la réponse est correcte on augmente proficiency par 1
          user_response.id_proficiency < 8
            ? (user_response.id_proficiency += 1)
            : null;
        } else {
          //Si la proficiency est l'une de valeurs suivantes: 3, 4, 6, 7 on diminue la proficiency par 2
          if ([4, 7].includes(user_response.id_proficiency))
            user_response.id_proficiency -= 2;
          else user_response.id_proficiency -= 1;
        }
        await this.updateUserResponseDto.save(user_response);
      }
    }

    return userResponse.length;
  }

  async update(id: number, updateUserResponseDto: UpdateUserResponseDto) {
    const userResponse = await this.updateUserResponseDto.preload({
      id_user_response: +id,
      ...updateUserResponseDto,
    });
    if (!userResponse) {
      throw new NotFoundException(`UserResponse #${id} not found`);
    }
    return this.updateUserResponseDto.save(userResponse);
  }

  remove(id: number) {
    return `This action removes a #${id} userResponse`;
  }

  async schoolResponseStats(id_user: number) {
    const schoolstats = this.updateUserResponseDto.query(
      `select schoolclass."name",COUNT(*) Filter (Where id_proficiency in (2,3,4)) as TOTAL_APPRENTISSAGE, 
      COUNT(*) Filter (Where id_proficiency = 8) as TOTAL_MAITRISE, 
       COUNT(*) Filter (Where id_proficiency in (5,6,7)) as TOTAL_ACQUIS
      from user_response
      join users_schoolclass_schoolclass on users_schoolclass_schoolclass."usersId"=user_response."id_user"
      join schoolclass ON schoolclass.id = users_schoolclass_schoolclass."schoolclassId"
      where schoolclass."id" in (select id from schoolclass where schoolclass."schoolId" in (select schoolclass."schoolId" from schoolclass 
      join school on schoolclass."schoolId"=school."id"
      join users_schoolclass_schoolclass on schoolclass."id"=users_schoolclass_schoolclass."schoolclassId"
      where users_schoolclass_schoolclass."usersId"=${id_user}))
      group by schoolclass."name"`,
    );
    return await schoolstats;
  }

  async userResponseStats(id_user: number) {
    const userstat = this.updateUserResponseDto.query(
      `select users."name"||' '||users."surname" as joueur,schoolclass."name" as classe ,COUNT(*) Filter (Where id_proficiency in (2,3,4)) as TOTAL_APPRENTISSAGE, 
      COUNT(*) Filter (Where id_proficiency = 8) as TOTAL_MAITRISE, 
       COUNT(*) Filter (Where id_proficiency in (5,6,7)) as TOTAL_ACQUIS,max(date_trunc('hour',user_response.date_response)) as lastPlay
      from user_response
      join users on users."id"=user_response."id_user"
      join users_schoolclass_schoolclass on users_schoolclass_schoolclass."usersId"=user_response."id_user"
      join schoolclass ON schoolclass.id = users_schoolclass_schoolclass."schoolclassId"
      where schoolclass."id" in (select id from schoolclass where schoolclass."schoolId" in (select schoolclass."schoolId" from schoolclass 
      join school on schoolclass."schoolId"=school."id"
      join users_schoolclass_schoolclass on schoolclass."id"=users_schoolclass_schoolclass."schoolclassId"
      where users_schoolclass_schoolclass."usersId"=${id_user}))
      group by joueur,schoolclass."name"`,
    );
    return await userstat;
  }
}
