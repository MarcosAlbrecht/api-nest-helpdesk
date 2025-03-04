import { Role, User } from '@prisma/client';
import { Request } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { jwtConstants } from 'src/auth/constants';
import { UserAuth } from 'src/auth/dtos/user-auth.dto';
import { UnauthorizedException } from 'src/exceptions/unauthorized.exceptions';

export const generateToken = (user: User & { role?: Role }): string => {
  return sign(
    {
      userId: user.id,
      email: user.email,
      admin: user.admin,
      role: user.role ? user.role.type : null,
    } as UserAuth,
    jwtConstants.secret,
    {
      subject: String(user.id),
      expiresIn: '30d',
    },
  );
};

export const verifyToken = async (
  authorization?: string,
): Promise<UserAuth> => {
  if (!authorization) {
    throw new UnauthorizedException();
  }
  const [, token] = authorization.split(' ');

  try {
    const decodedToken = <UserAuth>verify(token, jwtConstants.secret);

    return decodedToken;
  } catch (error) {
    throw new UnauthorizedException();
  }
};

export const getUserByToken = async (req: Request): Promise<UserAuth> => {
  const authorization = req.headers.authorization;

  return verifyToken(authorization);
};
