import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Prisma } from '@prisma/client';
import { Request } from 'express';
import { ArtService } from './art.service';
import { JwtAuthGaurd } from './guards/jwt.guard';

@Controller('art')
export class ArtController {
  constructor(private readonly artService: ArtService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGaurd)
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { title: string; desc: string },
    @Req() req: Request,
  ) {
    req.user;
    if (!file) {
      throw new Error('File is undefined');
    }
    return this.artService.create(file, body);
  }

  @Get()
  findUsers() {
    return this.artService.findUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtDto: Prisma.ArtUpdateInput) {
    return this.artService.update(id, updateArtDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artService.remove(id);
  }
}
