import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGaurd } from '../auth/guards/jwt.guard';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  @UseGuards(JwtAuthGaurd)
  like(@Body() body: { artId: string }, @Req() req: Request) {
    const userId = req.user as string;

    return this.likesService.like(userId, body.artId);
  }
}
