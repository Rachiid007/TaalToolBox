import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService]
})
export class AnswerModule {}
