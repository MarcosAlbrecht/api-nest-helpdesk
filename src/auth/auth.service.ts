import { Injectable, NotFoundException } from '@nestjs/common';
import { ValidatePassword } from 'src/utils/password';
import { AuthDTO } from './dtos/auth.dto';

@Injectable()
export class AuthService {
  validateAuth = async (authDTO: AuthDTO): Promise<ReturnUserAuth> => {
    const user = await getUserByEmail(authDTO.email);

    const isValidPassword = await ValidatePassword(
      authDTO.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new NotFoundException('User');
    }

    return new AuthModel(generateToken(user), user);
  };
}
