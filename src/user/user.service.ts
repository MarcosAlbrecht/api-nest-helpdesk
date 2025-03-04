import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreatePasswordHashed } from 'src/utils/password';
import { CreateUserDto } from './dto/create-user.dto';
import { ReturnUserDto } from './dto/return-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    const user: CreateUserDto = {
      ...createUserDto,
      password: await CreatePasswordHashed(createUserDto.password),
    };
    const created = await this.prisma.user.create({ data: user });
    return new ReturnUserDto(created);
  }

  async findAll(params: {
    skip?: number;
    take?: number;
  }): Promise<ReturnUserDto[]> {
    const { skip, take } = params;

    const users = await this.prisma.user.findMany({
      skip,
      take,
      include: {
        role: true,
      },
    });

    // Mapeia os campos para o DTO
    return users.map((user) => new ReturnUserDto(user));
  }

  findUserByEmail = async (email: string): Promise<User> => {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  };

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
