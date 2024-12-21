import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { DbService } from '../db/db.service';

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DbService) {}

  async signup(body: Prisma.UserCreateInput) {
    const user = await this.dbService.user.findUnique({
      where: { email: body.email },
    });

    if (user) {
      throw new HttpException(
        { message: 'User already exists', statusCode: HttpStatus.CONFLICT },
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    return this.dbService.user.create({
      data: { ...body, password: hashedPassword },
    });
  }

  async login(email: string, password: string) {
    const user = await this.dbService.user.findUnique({ where: { email } });

    if (!user) {
      throw new HttpException(
        {
          message: 'Invalid email or password',
          statusCode: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException(
        {
          message: 'Invalid email or password',
          statusCode: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return { message: 'Login Successful', user };
  }

  async update(id: string, body: Prisma.UserUpdateInput) {
    const user = await this.dbService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new HttpException(
        { message: "User doesn't exist", statusCode: HttpStatus.NOT_FOUND },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.dbService.user.update({
      where: { id },
      data: body,
    });
  }

  async delete(id: string) {
    const user = await this.dbService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new HttpException(
        { message: "User doesn't exist", statusCode: HttpStatus.NOT_FOUND },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.dbService.user.delete({
      where: { id },
    });
  }
}
