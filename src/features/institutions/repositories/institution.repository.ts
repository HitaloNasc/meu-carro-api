import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { logger } from 'src/common/utils/logger';
import { InstitutionEntity } from '../data/entities/institution.entity';

@Injectable()
export class InstitutionRepository {
  constructor(
    @InjectModel(InstitutionEntity.name)
    private model: Model<InstitutionEntity>,
  ) {}

  public async create(name: string, email: string): Promise<InstitutionEntity> {
    logger.log('repository - institution - create');

    const newInstitution = new this.model({
      name,
      email,
    });

    await newInstitution.save();

    return newInstitution;
  }

  public async findAll(): Promise<InstitutionEntity[]> {
    logger.log('repository - institution - findAll');
    return await this.model.find().exec();
  }

  public async findByName(name: string): Promise<InstitutionEntity | null> {
    logger.log('repository - institution - findByName');
    return await this.model.findOne({ name }).exec();
  }

  public async findByEmail(email: string): Promise<InstitutionEntity | null> {
    logger.log('repository - institution - findByEmail');
    return await this.model.findOne({ email }).exec();
  }

  public async findById(id: string): Promise<InstitutionEntity | null> {
    logger.log('repository - institution - findById');
    return await this.model.findById(id).exec();
  }

  public async deleteById(id: string): Promise<void> {
    logger.log('repository - institution - deleteById');
    await this.model.findOneAndDelete({ _id: id });
  }
}
