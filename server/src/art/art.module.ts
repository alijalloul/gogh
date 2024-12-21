import { Module } from '@nestjs/common';
import { ArtController } from './art.controller';
import { ArtService } from './art.service';

@Module({
  controllers: [ArtController],
  providers: [ArtService],
})
export class ArtModule {}
