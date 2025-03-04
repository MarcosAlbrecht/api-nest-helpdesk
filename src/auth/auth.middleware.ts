import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verifyToken } from 'src/utils/auth';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token não fornecido');
    }

    try {
      const decoded = await verifyToken(authHeader); // Verifica o token
      req.user = decoded; // Salva os dados do usuário na requisição
      next();
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
