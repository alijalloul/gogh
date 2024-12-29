import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { JwtAuthGaurd } from '../auth/guards/jwt.guard';
import { ArtService } from './art.service';
import { UpdateArtDto } from './dto/updateArtDto';

@Controller('art')
export class ArtController {
  constructor(private readonly artService: ArtService) {}

  @Get()
  fetch(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('limit', new ParseIntPipe()) limit: number,
    @Query('search') search?: string,
    @Query('userId') userId?: string,
  ) {
    return this.artService.fetch(page, limit, search, userId);
  }

  @Get('isOwner/:id')
  @UseGuards(JwtAuthGaurd)
  isOwner(@Param('id') id: string, @Req() req: Request) {
    const userId = req.user as string;

    return this.artService.isOwner(id, userId);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGaurd)
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { title: string; desc: string },
    @Req() req: Request,
  ) {
    const userId = req.user as string;

    return this.artService.create(file, body, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGaurd)
  update(
    @Param('id') id: string,
    @Body() body: UpdateArtDto,
    @Req() req: Request,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const userId = req.user as string;

    return this.artService.update(id, body, file, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGaurd)
  remove(@Param('id') id: string, @Req() req: Request) {
    const userId = req.user as string;

    return this.artService.remove(id, userId);
  }
}
