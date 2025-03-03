import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { generateToken } from 'src/utils/auth';
import { ValidatePassword } from 'src/utils/password';
import { AuthDTO } from './dtos/auth.dto';
import { ReturnUserAuth } from './dtos/return-auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  validateAuth = async (authDTO: AuthDTO): Promise<ReturnUserAuth> => {
    const user = await this.getUserByEmail(authDTO.email);

    const isValidPassword = await ValidatePassword(
      authDTO.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new NotFoundException('User');
    }

    return new ReturnUserAuth(generateToken(user));
  };

  getUserByEmail = async (email: string): Promise<User> => {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User');
    }

    return user;
  };
}
