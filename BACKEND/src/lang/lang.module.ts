import { Module } from '@nestjs/common';
import { LangService } from './lang.service';
import { LangController } from './lang.controller';

@Module({
  controllers: [LangController],
  providers: [LangService]
})
export class LangModule {}
