import { Module } from '@nestjs/common';
import { UserResponseService } from './user_response.service';
import { UserResponseController } from './user_response.controller';

@Module({
  controllers: [UserResponseController],
  providers: [UserResponseService]
})
export class UserResponseModule {}
