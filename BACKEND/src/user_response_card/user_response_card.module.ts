import { Module } from '@nestjs/common';
import { UserResponseCardService } from './user_response_card.service';
import { UserResponseCardController } from './user_response_card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResponseCard } from './entities/user_response_card.entity';
@Module({
  imports: [TypeOrmModule.forFeature([UserResponseCard])],
  controllers: [UserResponseCardController],
  providers: [UserResponseCardService],
})
export class UserResponseCardModule {}
