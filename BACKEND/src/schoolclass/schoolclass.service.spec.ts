import { Test, TestingModule } from '@nestjs/testing';
import { SchoolclassService } from './schoolclass.service';

describe('SchoolclassService', () => {
  let service: SchoolclassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolclassService],
    }).compile();

    service = module.get<SchoolclassService>(SchoolclassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
