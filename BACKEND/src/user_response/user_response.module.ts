import { Module } from '@nestjs/common';
import { UserResponseService } from './user_response.service';
import { UserResponseController } from './user_response.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResponse } from './entities/user_response.entity';

// Utilise les modules et entité suivant : Users , Card, Answer , LevelMap, Proficiency
@Module({
  imports: [TypeOrmModule.forFeature([UserResponse])],
  controllers: [UserResponseController],
  providers: [UserResponseService],
})
export class UserResponseModule {}
