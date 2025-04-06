import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { logger } from '../../../common/utils/logger';
import { ICurrentUser } from '../../users/decorators/user.decorator';
import { MaintenceEntity } from '../data/entities/maintence.entity';
import { MaintenceMapper } from '../data/mappers/maintence.mapper';
import { MaintenceDto } from '../data/model/maintence.dto';
import { CreateMaintenceRequestDto } from '../data/request/create-maintence.request.dto';
import { SyncMaintenceRequestDto } from '../data/request/sync-maintence.request.dto';
import { UpdateMaintenceRequestDto } from '../data/request/update-maintence.request.dto';
import { MaintenceRepository } from '../repositories/maintence.repository';

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
      clientId,
      description,
      odometer,
      performedAt,
      nextDueAt,
      deleted,
    }: CreateMaintenceRequestDto,
    currentUser: ICurrentUser,
  ): Promise<MaintenceDto> {
    logger.info('module - maintence - service - create');

    const userId = currentUser.id;

    this.validateCreateEntries({
      name,
      clientId,
      description,
      performedAt,
      nextDueAt,
      deleted,
    });

    await this.checkIfMaintenceExists(name, userId);

    const entity = await this.repository.create(
      name,
      clientId,
      description,
      odometer,
      performedAt,
      nextDueAt,
      deleted,
      userId,
    );

    return MaintenceMapper.entityToDto(entity);
  }

  public async update(
    id: string,
    {
      name,
      clientId,
      description,
      odometer,
      performedAt,
      nextDueAt,
      deleted,
    }: UpdateMaintenceRequestDto,
    currentUser: ICurrentUser,
  ): Promise<MaintenceDto> {
    logger.info('module - maintence - service - update');

    const maintence = await this.checkIfUserIsOwner(id, currentUser);

    if (name) maintence.name = name;
    if (clientId) maintence.clientId = clientId;
    if (description) maintence.description = description;
    if (odometer) maintence.odometer = odometer;
    if (performedAt) maintence.performedAt = performedAt;
    if (nextDueAt) maintence.nextDueAt = nextDueAt;
    if (deleted) maintence.deleted = deleted;
    maintence.updatedAt = new Date();

    const entity = await this.repository.update(maintence);

    return MaintenceMapper.entityToDto(entity);
  }

  private validateCreateEntries({
    name,
    clientId,
    // description,
    performedAt,
    nextDueAt,
    // deleted,
  }: CreateMaintenceRequestDto): void {
    if (!name) throw new BadRequestException('name is required');
    if (!clientId) throw new BadRequestException('clientId is required');
    if (!performedAt) throw new BadRequestException('name is required');
    if (!nextDueAt) throw new BadRequestException('name is required');
  }

  public async syncFromClient(
    currentUser: ICurrentUser,
    items: SyncMaintenceRequestDto[],
  ): Promise<{ success: boolean }> {
    for (const item of items) {
      const existing = await this.repository.findByClientId(
        item.clientId,
        currentUser.id,
      );

      if (!existing) {
        await this.repository.create(
          item.name,
          item.clientId,
          item.description,
          item.odometer,
          item.performedAt,
          item.nextDueAt,
          item.deleted,
          currentUser.id,
        );
      } else if (new Date(item.updastedAt) > existing.updatedAt) {
        existing.name = item.name;
        existing.clientId = item.clientId;
        existing.clientId = item.clientId;
        existing.description = item.description;
        existing.odometer = item.odometer;
        existing.performedAt = item.performedAt;
        existing.nextDueAt = item.nextDueAt;
        existing.deleted = item.deleted;
        await this.repository.update(existing);
      }
    }

    return { success: true };
  }

  public async syncGetUpdates(
    currentUser: ICurrentUser,
    since: string,
  ): Promise<MaintenceDto[]> {
    const sinceDate = new Date(since);

    const updates = await this.repository.findByUpdatedAt(
      currentUser.id,
      sinceDate,
    );
    return MaintenceMapper.entityListToDtoList(updates);
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
