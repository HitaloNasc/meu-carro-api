import { BadRequestException, Injectable } from '@nestjs/common';
import { logger } from '../../../common/utils/logger';
import { InstitutionsMapper } from '../data/mappers/institution.mapper';
import { InstitutionDto } from '../data/model/institution.dto';
import { CreateInstitutionRequestDto } from '../data/request/create-institution.request';
import { InstitutionRepository } from '../repositories/institution.repository';

@Injectable()
export class InstitutionService {
  constructor(private readonly repository: InstitutionRepository) {}

  public async findByAll(): Promise<InstitutionDto[]> {
    logger.log('institution - services - findByAll');
    const entities = await this.repository.findAll();
    return InstitutionsMapper.entityListToDtoList(entities);
  }

  public async findById(id: string): Promise<InstitutionDto> {
    logger.log('institution - services - findById');
    const entity = await this.repository.findById(id);
    return InstitutionsMapper.entityToDto(entity);
  }

  public async deleteById(id: string): Promise<void> {
    logger.log('institution - services - deleteById');
    await this.repository.deleteById(id);
  }

  public async findByEmail(email: string): Promise<InstitutionDto> {
    logger.log('institution - services - findByEmail');
    const entity = await this.repository.findByEmail(email);
    return InstitutionsMapper.entityToDto(entity);
  }

  public async findByName(name: string): Promise<InstitutionDto> {
    logger.log('institution - services - findByName');
    const entity = await this.repository.findByEmail(name);
    return InstitutionsMapper.entityToDto(entity);
  }

  public async create(
    createInstitutionRequestDto: CreateInstitutionRequestDto,
  ): Promise<InstitutionDto> {
    logger.log('institutions - service - create');
    logger.dir(createInstitutionRequestDto);
    this.validateCreateEntries(createInstitutionRequestDto);
    await this.checkIfInstitutionExists(createInstitutionRequestDto);

    const entity = await this.repository.create(
      createInstitutionRequestDto.name,
      createInstitutionRequestDto.email,
    );

    return InstitutionsMapper.entityToDto(entity);
  }

  private validateCreateEntries({
    name /* , email */,
  }: CreateInstitutionRequestDto): void {
    if (!name) throw new BadRequestException('name is required');
    // if (!validateEmail(email)) throw new BadRequestException('name is required');
  }

  private async checkIfInstitutionExists({
    name,
  }: CreateInstitutionRequestDto): Promise<void> {
    if (await this.findByName(name)) {
      throw new BadRequestException('institution already exists');
    }
  }
}
