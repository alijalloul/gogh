import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class LikesService {
  constructor(private readonly dbService: DbService) {}

  async like(userId: string, artId: string) {
    return this.dbService.likes.create({
      data: { userId, artId },
    });
  }

  async removeLike(userId: string, artId: string) {
    const like = await this.dbService.likes.findUnique({
      where: { userId_artId: { userId, artId } },
    });

    if (!like) {
      throw new HttpException(
        { message: "like doesn't exist", statusCode: HttpStatus.NOT_FOUND },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.dbService.likes.delete({
      where: { userId_artId: { userId, artId } },
    });
  }
}
