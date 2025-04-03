import { Test, TestingModule } from '@nestjs/testing';
import { MinterApiService } from './minter-api.service';

describe('MinterApiService', () => {
  let service: MinterApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinterApiService],
    }).compile();

    service = module.get<MinterApiService>(MinterApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
