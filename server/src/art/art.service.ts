import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { SupabaseService } from 'src/supabase/supabase.service';
import { DbService } from '../db/db.service';

@Injectable()
export class ArtService {
  constructor(
    private readonly dbService: DbService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async create(
    file: Express.Multer.File,
    body: { title: string; desc: string },
  ) {
    const { data, error } = await this.supabaseService.uploadFile(
      'art',
      `public/${file.originalname}`,
      file.buffer,
      {
        cacheControl: '3600',
        upsert: false,
        contentType: 'image/*',
      },
    );

    if (error) throw error;

    return this.dbService.art.create({
      data: {
        title: body.title,
        desc: body.desc,
        imageUrl: `${process.env.SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`,
        userId: 'dcb6cf0c-a1ad-4690-a16b-c78966c6b958',
      },
    });
  }

  findUsers() {
    return this.supabaseService.getUsers();
  }

  findAll() {
    return this.dbService.art.findMany();
  }

  findOne(id: string) {
    const art = this.dbService.art.findUnique({ where: { id } });

    if (!art) {
      throw new HttpException(
        { message: "Art doesn't exist", statusCode: HttpStatus.NOT_FOUND },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.dbService.art.findUnique({ where: { id } });
  }

  update(id: string, body: Prisma.ArtUpdateInput) {
    const art = this.dbService.art.findUnique({ where: { id } });

    if (!art) {
      throw new HttpException(
        { message: "Art doesn't exist", statusCode: HttpStatus.NOT_FOUND },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.dbService.art.update({ where: { id }, data: body });
  }

  remove(id: string) {
    const art = this.dbService.art.findUnique({ where: { id } });

    if (!art) {
      throw new HttpException(
        { message: "Art doesn't exist", statusCode: HttpStatus.NOT_FOUND },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.dbService.art.delete({ where: { id } });
  }
}
