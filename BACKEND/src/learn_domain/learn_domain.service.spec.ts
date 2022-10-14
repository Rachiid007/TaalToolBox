import { Test, TestingModule } from '@nestjs/testing';
import { LearnDomainService } from './learn_domain.service';

describe('LearnDomainService', () => {
  let service: LearnDomainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LearnDomainService],
    }).compile();

    service = module.get<LearnDomainService>(LearnDomainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
