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
          userId: iduser,
          cardId: userResponse[i]['id_card'],
        },
      });
      //Insérer une nouvelle réponse
      if (!user_response) {
        let proficiencyId;
        userResponse[i]['id_answer'] == 1
          ? (proficiencyId = 2)
          : (proficiencyId = 1);
        const newuser_response = {
          dateResponse: new Date(),
          userId: iduser,
          cardId: userResponse[i]['id_card'],
          answerId: userResponse[i]['id_answer'],
          proficiencyId: proficiencyId,
        };

        await this.create(newuser_response);
      } else {
        //changer date de réponse pour mettre la date actuelle
        user_response.dateResponse = new Date();
        //changer answer_id avec celle réçu
        user_response.answerId = userResponse[i]['id_answer'];
        //mise à jour de proficiency
        if (user_response.answerId == 1) {
          //Si la réponse est correcte on augmente proficiency par 1
          user_response.proficiencyId += 1;
        } else {
          //Si la proficiency est l'une de valeurs suivantes: 3, 4, 6, 7 on diminue la proficiency par 2
          if ([3, 4, 6, 7].includes(user_response.proficiencyId))
            user_response.proficiencyId -= 2;
        }
        await this.updateUserResponseDto.save(user_response);
      }
    }

    return userResponse.length;
  }

  async update(id: number, updateUserResponseDto: UpdateUserResponseDto) {
    const userResponse = await this.updateUserResponseDto.preload({
      id: +id,
      ...updateUserResponseDto,
    });
    if (!userResponse) {
      throw new NotFoundException(`UserResponse #${id} not found`);
    }
    return this.updateUserResponseDto.save(userResponse);
  }

  remove(id: number) {
    this.updateUserResponseDto.delete(id);
  }

  async schoolResponseStats(userId: number) {
    const schoolstats = this.updateUserResponseDto.query(
      `select schoolclass."name",COUNT(*) Filter (Where user_response."proficiencyId" in (2,3,4)) as TOTAL_APPRENTISSAGE, 
      COUNT(*) Filter (Where user_response."proficiencyId" = 8) as TOTAL_MAITRISE, 
       COUNT(*) Filter (Where user_response."proficiencyId" in (5,6,7)) as TOTAL_ACQUIS
      from user_response
      join users_schoolclass_schoolclass on users_schoolclass_schoolclass."usersId"=user_response."userId"
      join schoolclass ON schoolclass.id = users_schoolclass_schoolclass."schoolclassId"
      where schoolclass."id" in (select id from schoolclass where schoolclass."schoolId" in (select schoolclass."schoolId" from schoolclass 
      join school on schoolclass."schoolId"=school."id"
      join users_schoolclass_schoolclass on schoolclass."id"=users_schoolclass_schoolclass."schoolclassId"
      where users_schoolclass_schoolclass."usersId"=${userId}))
      group by schoolclass."name"`,
    );
    return await schoolstats;
  }

  async userResponseStats(userId: number) {
    const userstat = this.updateUserResponseDto.query(
      `select users."name"||' '||users."surname" as joueur,schoolclass."name" as classe ,COUNT(*) Filter (Where user_response."proficiencyId" in (2,3,4)) as TOTAL_APPRENTISSAGE, 
      COUNT(*) Filter (Where user_response."proficiencyId" = 8) as TOTAL_MAITRISE, 
       COUNT(*) Filter (Where user_response."proficiencyId" in (5,6,7)) as TOTAL_ACQUIS,max(date_trunc('hour',user_response."dateResponse")) as lastPlay
      from user_response
      join users on users."id"=user_response."userId"
      join users_schoolclass_schoolclass on users_schoolclass_schoolclass."usersId"=user_response."userId"
      join schoolclass ON schoolclass.id = users_schoolclass_schoolclass."schoolclassId"
      where schoolclass."id" in (select id from schoolclass where schoolclass."schoolId" in (select schoolclass."schoolId" from schoolclass 
      join school on schoolclass."schoolId"=school."id"
      join users_schoolclass_schoolclass on schoolclass."id"=users_schoolclass_schoolclass."schoolclassId"
      where users_schoolclass_schoolclass."usersId"=${userId}))
      group by joueur,schoolclass."name"`,
    );
    return await userstat;
  }
}
