import { Test, TestingModule } from '@nestjs/testing';
import { DragController } from './drag_and_drop.controller';
import { DragService } from './drag_and_drop.service';

describe('LangController', () => {
  let controller: DragController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DragController],
      providers: [DragService],
    }).compile();

    controller = module.get<DragController>(DragController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
