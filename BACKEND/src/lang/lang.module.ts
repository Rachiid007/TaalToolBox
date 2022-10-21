import { Module } from '@nestjs/common';
import { LangService } from './lang.service';
import { LangController } from './lang.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lang } from './entities/lang.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lang])],
  controllers: [LangController],
  providers: [LangService],
})
export class LangModule {}
