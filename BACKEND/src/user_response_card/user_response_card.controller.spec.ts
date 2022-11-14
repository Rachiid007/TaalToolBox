import { Test, TestingModule } from '@nestjs/testing';
import { UserResponseCardController } from './user_response_card.controller';
import { UserResponseCardService } from './user_response_card.service';

describe('UserResponseCardController', () => {
  let controller: UserResponseCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserResponseCardController],
      providers: [UserResponseCardService],
    }).compile();

    controller = module.get<UserResponseCardController>(UserResponseCardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
