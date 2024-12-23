import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ArtController } from './art.controller';
import { ArtService } from './art.service';

@Module({
  imports: [AuthModule],
  controllers: [ArtController],
  providers: [ArtService],
})
export class ArtModule {}
