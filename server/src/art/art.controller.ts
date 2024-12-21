import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Prisma } from '@prisma/client';
import { ArtService } from './art.service';

@Controller('art')
export class ArtController {
  constructor(private readonly artService: ArtService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('File is undefined');
    }
    return this.artService.create(file);
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
