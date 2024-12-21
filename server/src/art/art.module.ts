import { Module } from '@nestjs/common';
import { ArtController } from './art.controller';
import { ArtService } from './art.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [ArtController],
  providers: [ArtService, JwtStrategy],
})
export class ArtModule {}
