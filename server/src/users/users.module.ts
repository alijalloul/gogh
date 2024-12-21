import { Module } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, SupabaseService],
})
export class UsersModule {}
