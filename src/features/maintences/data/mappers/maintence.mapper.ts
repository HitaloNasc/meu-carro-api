import { MaintenceEntity } from '../entities/maintence.entity';
import { MaintenceDto } from '../model/maintence.dto';

export class MaintenceMapper {
  public static entityToDto(entity: MaintenceEntity): MaintenceDto | null {
    if (!entity) return null;

    const dto = new MaintenceDto();
    dto.id = entity.id;
    dto.userId = entity.userId;
    dto.name = entity.name;
    dto.description = entity.description;
    dto.odometer = entity.odometer;
    dto.performedAt = entity.performedAt;
    dto.nextDueAt = entity.nextDueAt;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;

    return dto;
  }

  public static entityListToDtoList(
    entities: MaintenceEntity[],
  ): MaintenceDto[] {
    if (!entities) return [];
    return entities.map((entity) => this.entityToDto(entity));
  }
}
