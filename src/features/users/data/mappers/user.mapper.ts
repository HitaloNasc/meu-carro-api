import { UserEntity } from '../entities/user.entity';
import { UserOpenDto } from '../model/user-open.dto';
import { UserDto } from '../model/user.dto';
import { CreateUserRequestDto } from '../request/create-user.request.dto';

export class UserMapper {
  public static entityToDto(entity: UserEntity): UserDto | null {
    if (!entity) return null;

    const dto = new UserDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.email = entity.email;
    dto.password = entity.password;
    dto.photo = entity.photo;
    dto.role = entity.role;
    dto.provider = entity.provider;
    dto.userProviderId = entity.userProviderId;
    dto.institutionId = entity.institutionId;
    dto.institutionName = entity.institutionName;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;

    return dto;
  }

  public static entityListToDtoList(entities: UserEntity[]): UserDto[] {
    if (!entities) return [];
    return entities.map((entity) => this.entityToDto(entity));
  }

  public static entityToOpenDto(entity: UserEntity): UserOpenDto | null {
    if (!entity) return null;

    const dto = new UserDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.email = entity.email;
    dto.photo = entity.photo;
    dto.role = entity.role;
    dto.provider = entity.provider;
    dto.userProviderId = entity.userProviderId;
    dto.institutionId = entity.institutionId;
    dto.institutionName = entity.institutionName;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;

    return dto;
  }

  public static entityListToOpenDtoList(entities: UserEntity[]): UserOpenDto[] {
    if (!entities) return [];
    return entities.map((entity) => this.entityToOpenDto(entity));
  }

  public static dtoToCreateDto(dto: UserDto): CreateUserRequestDto | null {
    if (!dto) return null;

    const createDto = new CreateUserRequestDto();
    createDto.name = dto.name;
    createDto.email = dto.email;
    createDto.password = dto.password;
    createDto.photo = dto.photo;
    createDto.provider = dto.provider;
    createDto.userProviderId = dto.userProviderId;

    return createDto;
  }
}
