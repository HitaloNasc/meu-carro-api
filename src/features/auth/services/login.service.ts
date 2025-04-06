import { BadRequestException, Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { UserMapper } from 'src/features/users/data/mappers/user.mapper';
import { UserDto } from 'src/features/users/data/model/user.dto';
import { UserService } from 'src/features/users/services/user.service';
import { logger } from '../../../common/utils/logger';
import { LoginDto } from '../data/request/login.request.dto';
import { LoginResponseDto } from '../data/response/login-response.dto';
import { JwtTokenService } from './jwt-token.service';

@Injectable()
export class LoginService {
  constructor(
    private readonly jwtTokenService: JwtTokenService,
    private readonly userService: UserService,
  ) {}

  public async login({ email, password }: LoginDto): Promise<LoginResponseDto> {
    logger.log('auth - services - login - login');

    this.validateLoginEntries({ email, password });
    const user = await this.getUserOrThrow(email);

    await this.validatePassword(password, user.password);

    return this.buildLoginResponse(user);
  }

  public async loginWithIdentityProviders(
    user: UserDto,
  ): Promise<LoginResponseDto> {
    let existingUser = await this.userService.findByEmail(user.email);

    if (!existingUser) {
      existingUser = await this.userService.create(
        UserMapper.dtoToCreateDto(user),
      );
    }

    return this.buildLoginResponse(existingUser);
  }

  private buildLoginResponse(userDto: UserDto): LoginResponseDto {
    const user = {
      id: userDto.id,
      email: userDto.email,
      name: userDto.name,
      photo: userDto.photo,
      role: userDto.role,
      institutionId: userDto.institutionId,
      createdAt: userDto.createdAt,
    };

    return {
      token: this.jwtTokenService.generateToken({ ...user }),
      user,
    };
  }

  private validateLoginEntries({ email, password }: LoginDto): void {
    if (!email || !password)
      throw new BadRequestException('email and password are required');
  }

  private async validatePassword(
    incomingPassword: string,
    currentUserPassword: string | undefined,
  ): Promise<void> {
    if (
      !currentUserPassword ||
      !(await compare(incomingPassword, currentUserPassword))
    ) {
      throw new BadRequestException('invalid credentials');
    }
  }

  private async getUserOrThrow(email: string): Promise<UserDto> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new BadRequestException('user not found');
    return user;
  }
}
