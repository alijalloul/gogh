import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class LikesService {
  constructor(private readonly dbService: DbService) {}

  async like(userId: string, artId: string) {
    const like = await this.dbService.likes.findUnique({
      where: { userId_artId: { userId, artId } },
    });

    if (like) {
      return this.dbService.likes.delete({
        where: { userId_artId: { userId, artId } },
      });
    }

    return this.dbService.likes.create({
      data: { userId, artId },
    });
  }
}
