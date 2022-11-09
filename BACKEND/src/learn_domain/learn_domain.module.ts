import { Module } from '@nestjs/common';
import { LearnDomainService } from './learn_domain.service';
import { LearnDomainController } from './learn_domain.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LearnDomain } from './entities/learn_domain.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LearnDomain])],
  controllers: [LearnDomainController],
  providers: [LearnDomainService],
})
export class LearnDomainModule {}
