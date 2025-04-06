import { Module } from '@nestjs/common';
import { LoginController } from './controllers/login.controller';
import { LoginService } from './services/login.service';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './login-strategies/google.strategy';
import { GoogleAuthGuard } from './guards/google.auth.guard';
import { TestController } from './controllers/login-google.controller';
import { JwtTokenService } from './services/jwt-token.service';
import { UserService } from '../users/services/user.service';
import { UserModule } from '../users/user.module';

@Module({
  imports: [UserModule, ConfigModule],
  controllers: [LoginController, TestController],
  providers: [
    LoginService,
    JwtTokenService,
    UserService,
    GoogleStrategy,
    GoogleAuthGuard,
  ],
  exports: [JwtTokenService],
})
export class AuthModule {}
