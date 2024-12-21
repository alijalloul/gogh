import { Test, TestingModule } from '@nestjs/testing';
import { ArtService } from './art.service';

describe('ArtService', () => {
  let service: ArtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtService],
    }).compile();

    service = module.get<ArtService>(ArtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
