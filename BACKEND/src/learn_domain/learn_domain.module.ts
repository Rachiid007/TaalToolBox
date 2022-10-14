import { Module } from '@nestjs/common';
import { LearnDomainService } from './learn_domain.service';
import { LearnDomainController } from './learn_domain.controller';

@Module({
  controllers: [LearnDomainController],
  providers: [LearnDomainService]
})
export class LearnDomainModule {}
