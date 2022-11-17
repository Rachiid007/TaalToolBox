import { Test, TestingModule } from '@nestjs/testing';
import { UserResponseService } from './user_response.service';

describe('UserResponseService', () => {
  let service: UserResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResponseService],
    }).compile();

    service = module.get<UserResponseService>(UserResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
