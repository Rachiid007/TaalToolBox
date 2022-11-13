import { Test, TestingModule } from '@nestjs/testing';
import { DragService } from './drag_and_drop.service';

describe('LangService', () => {
  let service: DragService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DragService],
    }).compile();

    service = module.get<DragService>(DragService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
