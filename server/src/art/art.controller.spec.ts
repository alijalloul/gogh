import { Test, TestingModule } from '@nestjs/testing';
import { ArtController } from './art.controller';

describe('ArtController', () => {
  let controller: ArtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtController],
    }).compile();

    controller = module.get<ArtController>(ArtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
