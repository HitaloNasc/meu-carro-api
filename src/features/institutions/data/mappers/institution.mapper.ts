import { InstitutionEntity } from "../entities/institution.entity";
import { InstitutionDto } from "../model/institution.dto";

export class InstitutionsMapper {
  public static entityToDto(entity: InstitutionEntity): InstitutionDto | null {
    if (!entity) return null;

    const dto = new InstitutionDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.email = entity.email;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;

    return dto;
  }

  public static entityListToDtoList(entities: InstitutionEntity[]): InstitutionDto[] {
    if (!entities) return [];
    return entities.map(entity => this.entityToDto(entity));
  }

}
