import { Module } from '@nestjs/common';
import { UserResponseCardService } from './user_response_card.service';
import { UserResponseCardController } from './user_response_card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResponseCard } from './entities/user_response_card.entity';
import { Card } from '../cards/entities/card.entity';
import { Answer } from '../answer/entities/answer.entity';
import { Users } from '../users/entities/users.entity';
@Module({
  imports: [TypeOrmModule.forFeature([UserResponseCard, Card , Answer, Users])],
  controllers: [UserResponseCardController],
  providers: [UserResponseCardService],
})
export class UserResponseCardModule {}
