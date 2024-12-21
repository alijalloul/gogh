import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtModule } from './art/art.module';
import { DbModule } from './db/db.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, ArtModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
