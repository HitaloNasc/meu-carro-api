import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcryptjs';
import { validateEmail } from 'src/common/utils/validate-email';
import { validatePassword } from 'src/common/utils/validate-password';
import { logger } from '../../../common/utils/logger';
import { UserMapper } from '../data/mappers/user.mapper';
import { UserOpenDto } from '../data/model/user-open.dto';
import { UserDto } from '../data/model/user.dto';
import { CreateUserRequestDto } from '../data/request/create-user.request.dto';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  private salts: number;

  constructor(
    private readonly configService: ConfigService,
    private readonly repository: UserRepository,
  ) {
    this.salts = this.configService.get('env.auth.bcrypt.salts');
  }

  public async findByAll(): Promise<UserDto[]> {
    logger.log('users - services - findByAll');
    const entities = await this.repository.findAll();
    return UserMapper.entityListToOpenDtoList(entities);
  }

  public async findById(id: string): Promise<UserDto> {
    logger.log('users - services - findById');
    const entity = await this.repository.findById(id);
    return UserMapper.entityToOpenDto(entity);
  }

  public async deleteById(id: string): Promise<void> {
    logger.log('users - services - deleteById');
    await this.repository.deleteById(id);
  }

  public async findByEmail(email: string): Promise<UserDto> {
    logger.log('users - services - findByEmail');
    const entity = await this.repository.findByEmail(email);
    return UserMapper.entityToDto(entity);
  }

  public async create(
    createUserRequestDto: CreateUserRequestDto,
  ): Promise<UserOpenDto> {
    logger.log('module - users - service - create');
    this.validateCreateEntries(createUserRequestDto);
    await this.checkIfUserExists(createUserRequestDto);

    const entity = await this.repository.create(
      createUserRequestDto.name,
      createUserRequestDto.email,
      createUserRequestDto.provider && createUserRequestDto.userProviderId
        ? null
        : await this.generateHashedPassword(createUserRequestDto.password),
      createUserRequestDto.photo,
      createUserRequestDto.provider,
      createUserRequestDto.userProviderId,
    );

    return UserMapper.entityToOpenDto(entity);
  }

  public async firstLogin(
    userId: string,
    institutionId: string,
    institutionName: string,
  ): Promise<UserOpenDto> {
    logger.log('module - users - service - firstLogin');

    const user = await this.repository.findById(userId);

    if (!user) throw new BadRequestException('User not found');

    user.institutionId = institutionId;
    user.institutionName = institutionName;

    const updatedUser = await this.repository.update(user);

    return UserMapper.entityToOpenDto(updatedUser);
  }

  private validateCreateEntries({
    name,
    email,
    password,
    confirmPassword,
    provider,
    userProviderId,
  }: CreateUserRequestDto): void {
    if (!name) throw new BadRequestException('name is required');
    if (!validateEmail(email))
      throw new BadRequestException('email is invalid');
    this.validatePassword(password, confirmPassword, provider, userProviderId);
  }

  private validatePassword(
    password: string,
    confirmPassword: string,
    provider: string,
    userProviderId: string,
  ) {
    if (provider && userProviderId) return;
    if (!validatePassword(password))
      throw new BadRequestException('password is invalid');
    if (confirmPassword !== password)
      throw new BadRequestException('passwords do not match');
  }

  private async checkIfUserExists({
    email,
  }: CreateUserRequestDto): Promise<void> {
    if (await this.findByEmail(email)) {
      throw new BadRequestException('Email already exists');
    }
  }

  private async generateHashedPassword(
    incomingPassword: string,
  ): Promise<string> {
    if (!this.salts) {
      throw new Error('Salt rounds for bcrypt are not defined!');
    }

    return await hash(incomingPassword, this.salts);
  }
}
