import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { logger } from 'src/common/utils/logger';
import { MaintenceEntity } from '../data/entities/maintence.entity';

@Injectable()
export class MaintenceRepository {
  constructor(
    @InjectModel(MaintenceEntity.name) private model: Model<MaintenceEntity>,
  ) {}

  public async create(
    name: string,
    clientId: string,
    description: string,
    odometer: number,
    performedAt: Date,
    nextDueAt: Date,
    deleted: boolean,
    userId: string,
  ): Promise<MaintenceEntity> {
    logger.info('repository - maintence - create');

    const newMaintence = new this.model({
      name,
      clientId,
      description,
      odometer,
      performedAt,
      nextDueAt,
      deleted,
      userId,
    });

    await newMaintence.save();

    return newMaintence;
  }

  public async update(maintence: MaintenceEntity) {
    logger.info('repository - maintence - update');
    return await maintence.save();
  }

  public async findAll(userId?: string): Promise<MaintenceEntity[]> {
    logger.info('repository - maintence - findAll');
    return await this.model.find({ userId, deleted: false }).exec();
  }

  public async findByUpdatedAt(
    userId: string,
    since: Date,
  ): Promise<MaintenceEntity[] | null> {
    logger.info('repository - maintence - findByUpdatedAt');
    return await this.model
      .find({ userId, deleted: false, updatedAt: { $gt: since } })
      .exec();
  }

  public async findByName(
    name: string,
    userId: string,
  ): Promise<MaintenceEntity | null> {
    logger.info('repository - maintence - findByName');
    return await this.model.findOne({ name, userId, deleted: false }).exec();
  }

  public async findByClientId(
    clientId: string,
    userId: string,
  ): Promise<MaintenceEntity | null> {
    logger.info('repository - maintence - findByClientId');
    return await this.model
      .findOne({ clientId, userId, deleted: false })
      .exec();
  }

  public async findById(id: string): Promise<MaintenceEntity | null> {
    logger.info('repository - maintence - findById');
    return await this.model.findOne({ _id: id, deleted: false }).exec();
  }

  public async deleteById(id: string): Promise<void> {
    logger.info('repository - maintence - deleteById');
    await this.model.findOneAndDelete({ _id: id });
  }
}
