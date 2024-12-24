import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request } from 'express';
import { JwtAuthGaurd } from '../auth/guards/jwt.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGaurd)
  fetchMe(@Req() req: Request) {
    const userId = req.user as string;
    return this.usersService.fetchUser(userId);
  }

  @Get(':id')
  fetchUser(@Param() id: string) {
    return this.usersService.fetchUser(id);
  }

  @Get('')
  fetchUsers(@Param() id: string) {
    return this.usersService.fetchUsers();
  }

  @Post('signup')
  signup(@Body() body: Prisma.UserCreateInput) {
    return this.usersService.signup(body);
  }

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.usersService.login(body.email, body.password);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Prisma.UserUpdateInput) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
