import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { JwtTokenService } from 'src/features/auth/services/jwt-token.service';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtTokenService) {}

  use(req: Request, _res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('token not found or invalid');
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload = this.jwtService.verifyToken(token);
      req['user'] = payload;
      next();
    } catch (err) {
      logger.error(err);
      throw new UnauthorizedException('token invalid or expired');
    }
  }
}
