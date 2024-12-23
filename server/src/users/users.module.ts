import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { SupabaseService } from 'src/supabase/supabase.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [UsersService, SupabaseService],
})
export class UsersModule {}
