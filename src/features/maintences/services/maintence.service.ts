import { ICurrentUser } from '../../users/decorators/user.decorator';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { logger } from '../../../common/utils/logger';
import { MaintenceMapper } from '../data/mappers/maintence.mapper';
import { MaintenceDto } from '../data/model/maintence.dto';
import { CreateMaintenceRequestDto } from '../data/request/create-maintence.request.dto';
import { MaintenceRepository } from '../repositories/maintence.repository';
import { MaintenceEntity } from '../data/entities/maintence.entity';
import { UpdateMaintenceRequestDto } from '../data/request/update-maintence.request.dto';

@Injectable()
export class MaintenceService {
  constructor(private readonly repository: MaintenceRepository) {}

  public async findAll(currentUser: ICurrentUser): Promise<MaintenceDto[]> {
    logger.info('maintence - services - findAll');

    const isAdmin = currentUser.role.includes('admin');
    const userId = isAdmin ? undefined : currentUser.id;
    const entities = await this.repository.findAll(userId);

    return MaintenceMapper.entityListToDtoList(entities);
  }

  public async findById(
    id: string,
    currentUser: ICurrentUser,
  ): Promise<MaintenceDto> {
    logger.info('maintence - services - findById');
    const entity = await this.checkIfUserIsOwner(id, currentUser);
    return MaintenceMapper.entityToDto(entity);
  }

  public async deleteById(
    id: string,
    currentUser: ICurrentUser,
  ): Promise<void> {
    logger.info('maintence - services - deleteById');
    await this.checkIfUserIsOwner(id, currentUser);
    await this.repository.deleteById(id);
  }

  public async create(
    {
      name,
      description,
      odometer,
      performedAt,
      nextDueAt,
    }: CreateMaintenceRequestDto,
    currentUser: ICurrentUser,
  ): Promise<MaintenceDto> {
    logger.info('module - maintence - service - create');

    const userId = currentUser.id;

    this.validateCreateEntries({ name, performedAt, nextDueAt });

    await this.checkIfMaintenceExists(name, userId);

    const entity = await this.repository.create(
      name,
      description,
      odometer,
      performedAt,
      nextDueAt,
      userId,
    );

    return MaintenceMapper.entityToDto(entity);
  }

  public async update(
    id: string,
    {
      name,
      description,
      odometer,
      performedAt,
      nextDueAt,
    }: UpdateMaintenceRequestDto,
    currentUser: ICurrentUser,
  ): Promise<MaintenceDto> {
    logger.info('module - maintence - service - update');

    const maintence = await this.checkIfUserIsOwner(id, currentUser);

    if (name) maintence.name = name;
    if (description) maintence.description = description;
    if (odometer) maintence.odometer = odometer;
    if (performedAt) maintence.performedAt = performedAt;
    if (nextDueAt) maintence.nextDueAt = nextDueAt;
    maintence.updatedAt = new Date();

    const entity = await this.repository.update(maintence);

    return MaintenceMapper.entityToDto(entity);
  }

  private validateCreateEntries({
    name,
    // description,
    performedAt,
    nextDueAt,
  }: CreateMaintenceRequestDto): void {
    if (!name) throw new BadRequestException('name is required');
    if (!performedAt) throw new BadRequestException('name is required');
    if (!nextDueAt) throw new BadRequestException('name is required');
  }

  private async checkIfMaintenceExists(
    name: string,
    userId: string,
  ): Promise<MaintenceEntity> {
    const maintence = await this.repository.findByName(name, userId);
    if (maintence) {
      throw new BadRequestException('Maintence already exists');
    }
    return maintence;
  }

  private async checkIfUserIsOwner(
    id: string,
    currentUser: ICurrentUser,
  ): Promise<MaintenceEntity> {
    const entity = await this.repository.findById(id);
    if (entity.userId !== currentUser.id) {
      throw new ForbiddenException(
        'You are not authorized to access this resource',
      );
    }
    return entity;
  }
}
