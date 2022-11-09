import { Test, TestingModule } from '@nestjs/testing';
import { UserResponseCardService } from './user_response_card.service';

describe('UserResponseCardService', () => {
  let service: UserResponseCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResponseCardService],
    }).compile();

    service = module.get<UserResponseCardService>(UserResponseCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
