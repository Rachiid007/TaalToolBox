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
    return 'This action adds a new userResponse';
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
      //Erreur si pas de donnée trouvée
      if (!user_response) {
        console.error(
          "user_response doesn't exist iduser=" +
            iduser +
            ' id_card=' +
            userResponse[i]['id_card'],
        );
      } else {
        //changer date de réponse pour mettre la date actuelle
        user_response.date_response = new Date();
        //changer answer_id avec celle réçu
        user_response.id_answer = userResponse[i]['id_answer'];
        //mise à jour de proficiency
        if (user_response.id_answer == 1) {
          //Si la réponse est correcte on augmente proficiency par 1
          user_response.id_proficiency += 1;
        } else {
          //Si la proficiency est l'une de valeurs suivantes: 3, 4, 6, 7 on diminue la proficiency par 2
          if ([3, 4, 6, 7].includes(user_response.id_proficiency))
            user_response.id_proficiency -= 2;
        }
      }
      await this.updateUserResponseDto.save(user_response);
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
}
