import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { DbService } from '../db/db.service';
import { SupabaseService } from '../supabase/supabase.service';
import { UpdateArtDto } from './dto/updateArtDto';

@Injectable()
export class ArtService {
  constructor(
    private readonly dbService: DbService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async create(
    file: Express.Multer.File,
    body: { title: string; desc: string },
    userId: string,
  ) {
    const randomString = crypto.randomBytes(16).toString('hex');
    const fileName = `${randomString}-${file.originalname}`;

    const { data, error } = await this.supabaseService.uploadFile(
      fileName,
      file.buffer,
    );

    if (error) throw error;

    return this.dbService.art.create({
      data: {
        title: body.title,
        desc: body.desc,
        imageUrl: `${process.env.SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`,
        userId,
      },
    });
  }

  async fetch(page: number, limit: number, search: string) {
    const startIndex = (page - 1) * limit;

    if (page < 1 || limit < 1) {
      throw new HttpException(
        { message: 'Page and limit must be positive numbers' },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const searchCondition = search
        ? {
            OR: [
              { title: { contains: search } },
              { desc: { contains: search } },
            ],
          }
        : {};

      const [items, total] = await Promise.all([
        this.dbService.art.findMany({
          skip: startIndex,
          take: limit,
          where: searchCondition,
        }),
        this.dbService.art.count({
          where: searchCondition,
        }),
      ]);

      return {
        items,
        total,
      };
    } catch (error) {
      throw new HttpException(
        { message: 'Failed to fetch data', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return this.dbService.art.findMany();
  }

  async findOne(id: string) {
    const art = await this.dbService.art.findUnique({ where: { id } });

    if (!art) {
      throw new HttpException(
        { message: "Art doesn't exist", statusCode: HttpStatus.NOT_FOUND },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.dbService.art.findUnique({ where: { id } });
  }

  async update(id: string, body: UpdateArtDto, file: Express.Multer.File) {
    const art = await this.dbService.art.findUnique({
      where: { id },
    });

    if (!art) {
      throw new HttpException(
        { message: "Art doesn't exist", statusCode: HttpStatus.NOT_FOUND },
        HttpStatus.NOT_FOUND,
      );
    }

    let res = { data: null, error: null };

    if (file) {
      const randomString = crypto.randomBytes(16).toString('hex');
      const fileName = `${randomString}-${file.originalname}`;

      res = await this.supabaseService.updateFile(
        art.imageUrl.split('publib/')[1],
        fileName,
        file.buffer,
      );

      if (res.error) throw res.error;
    }

    return this.dbService.art.update({
      where: { id },
      data: {
        ...body,
        imageUrl: file
          ? `${process.env.SUPABASE_URL}/storage/v1/object/public/${res.data.fullPath}`
          : art.imageUrl,
      },
    });
  }

  async remove(id: string) {
    const art = await this.dbService.art.findUnique({ where: { id } });

    if (!art) {
      throw new HttpException(
        { message: "Art doesn't exist", statusCode: HttpStatus.NOT_FOUND },
        HttpStatus.NOT_FOUND,
      );
    }

    const { error } = await this.supabaseService.deleteFile(
      art.imageUrl.split('publib/')[1],
    );

    if (error) throw error;

    return this.dbService.art.delete({ where: { id } });
  }
}
