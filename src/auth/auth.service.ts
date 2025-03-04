import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserService } from 'src/user/user.service';
import { generateToken } from 'src/utils/auth';
import { ValidatePassword } from 'src/utils/password';
import { AuthDTO } from './dtos/auth.dto';
import { ReturnUserAuth } from './dtos/return-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  validateAuth = async (authDTO: AuthDTO): Promise<ReturnUserAuth> => {
    const user = await this.userService.findUserByEmail(authDTO.email);

    const isValidPassword = await ValidatePassword(
      authDTO.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new NotFoundException('User');
    }

    return new ReturnUserAuth(generateToken(user));
  };
}
