import { Test, TestingModule } from '@nestjs/testing';
import { ArtController } from './art.controller';
import { ArtService } from './art.service';

describe('ArtController', () => {
  let controller: ArtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtController],
      providers: [ArtService],
    }).compile();

    controller = module.get<ArtController>(ArtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
