import { Injectable } from '@nestjs/common';
import { sign, verify, decode, SignOptions } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtTokenService {
  constructor(private readonly configService: ConfigService) {}

  public generateToken(
    payload: Record<string, any>,
    customOptions?: SignOptions,
  ): string {
    const options = this.mergeOptions(customOptions);
    return sign(payload, this.getJwtSecret(), options);
  }

  public verifyToken<T>(token: string): T {
    try {
      return verify(token, this.getJwtSecret()) as T;
    } catch (err) {
      console.error(err);
      throw new Error('Invalid or expired token');
    }
  }

  public decodeToken(token: string): null | { [key: string]: any } | string {
    return decode(token);
  }

  private getJwtSecret(): string {
    return (
      this.configService.get<string>('env.auth.jwt.secret') ||
      (() => {
        throw new Error(
          'JWT secret is not defined in the environment variables',
        );
      })()
    );
  }

  private mergeOptions(customOptions?: SignOptions): SignOptions {
    return { ...this.getDefaultOptions(), ...customOptions };
  }

  private getDefaultOptions(): SignOptions {
    return {
      // expiresIn: this.configService.get<string>('env.auth.jwt.expiration'),
      issuer: this.configService.get<string>('env.auth.jwt.issuer'),
    };
  }
}
