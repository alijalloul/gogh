import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { DbService } from '../db/db.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly dbService: DbService,
    private readonly jwtService: JwtService,
  ) {}

  async fetchUser(id: string) {
    const user = await this.dbService.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        art: true,
      },
    });
    return user;
  }

  fetchUsers() {
    return this.dbService.user.findMany({
      select: { id: true, firstName: true, lastName: true, email: true },
    });
  }

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

    const newUser = await this.dbService.user.create({
      data: { ...body, password: hashedPassword },
    });

    const { firstName, lastName, email } = newUser;
    return {
      user: { firstName, lastName, email },
      token: this.jwtService.sign({ id: newUser.id }),
    };
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
      throw new UnauthorizedException();
    }
    const { firstName, lastName, email: userEmail } = user;
    return {
      user: { firstName, lastName, email: userEmail },
      token: this.jwtService.sign({ id: user.id }),
    };
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
