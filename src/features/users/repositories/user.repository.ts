import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserProviderEnum } from 'src/common/enums/user-provider.enum';
import { logger } from 'src/common/utils/logger';
import { UserEntity } from '../data/entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(UserEntity.name) private model: Model<UserEntity>) {}

  public async create(
    name: string,
    email: string,
    password?: string,
    photo?: string,
    provider?: UserProviderEnum,
    userProviderId?: string,
  ): Promise<UserEntity> {
    logger.log('repository - user - create');

    const newUser = new this.model({
      name,
      email,
      password,
      photo,
      provider: provider || null,
      userProviderId,
    });

    await newUser.save();

    return newUser;
  }

  public async update(user: UserEntity) {
    logger.log('repository - user - update');
    return await user.save();
  }

  public async findAll(): Promise<UserEntity[]> {
    logger.log('repository - user - findAll');
    return await this.model.find().exec();
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    logger.log('repository - user - findByEmail');
    return await this.model.findOne({ email }).exec();
  }

  public async findById(id: string): Promise<UserEntity | null> {
    logger.log('repository - user - findById');
    return await this.model.findById(id).exec();
  }

  public async deleteById(id: string): Promise<void> {
    logger.log('repository - user - deleteById');
    await this.model.findOneAndDelete({ _id: id });
  }
}
