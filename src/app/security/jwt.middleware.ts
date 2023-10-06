import { Injectable, type NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class JWTAuthCorreios implements NestMiddleware {
  private readonly token = `Bearer ${process.env.JWT}`;

  use(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (authHeader === this.token) {
      next();
    } else {
      res.status(401).json({ message: 'UNAUTHORIZED' });
    }
  }
}
