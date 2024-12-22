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
import { ArtService } from './art.service';
import { UpdateArtDto } from './dto/updateArtDto';
import { JwtAuthGaurd } from './guards/jwt.guard';

@Controller('art')
export class ArtController {
  constructor(private readonly artService: ArtService) {}

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

  @Get()
  fetch(
    @Query('page', new ParseIntPipe()) page: number = 1,
    @Query('limit', new ParseIntPipe()) limit: number = 4,
    @Query('search') search?: string,
  ) {
    return this.artService.fetch(page, limit, search);
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
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.artService.update(id, body, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artService.remove(id);
  }
}
