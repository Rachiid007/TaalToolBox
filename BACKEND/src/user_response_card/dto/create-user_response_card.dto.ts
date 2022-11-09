import { Card } from './../../cards/entities/card.entity';
import { Answer } from './../../answer/entities/answer.entity';
import { Users } from './../../users/entities/users.entity';

export class CreateUserResponseCardDto {
    date_response : Date
    user : Users
    answer : Answer
    card : Card
}
