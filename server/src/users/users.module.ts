import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SupabaseService } from 'src/supabase/supabase.service';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  controllers: [UsersController],
  providers: [UsersService, SupabaseService, LocalStrategy],
})
export class UsersModule {}
