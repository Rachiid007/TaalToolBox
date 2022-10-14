import { Test, TestingModule } from '@nestjs/testing';
import { LearnDomainController } from './learn_domain.controller';
import { LearnDomainService } from './learn_domain.service';

describe('LearnDomainController', () => {
  let controller: LearnDomainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LearnDomainController],
      providers: [LearnDomainService],
    }).compile();

    controller = module.get<LearnDomainController>(LearnDomainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
