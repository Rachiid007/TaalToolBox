import { Test, TestingModule } from '@nestjs/testing';
import { UserResponseController } from './user_response.controller';
import { UserResponseService } from './user_response.service';

describe('UserResponseController', () => {
  let controller: UserResponseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserResponseController],
      providers: [UserResponseService],
    }).compile();

    controller = module.get<UserResponseController>(UserResponseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
