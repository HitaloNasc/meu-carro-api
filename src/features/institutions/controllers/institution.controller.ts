import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { logger } from 'src/common/utils/logger';
import { InstitutionDto } from '../data/model/institution.dto';
import { CreateInstitutionRequestDto } from '../data/request/create-institution.request';
import { InstitutionService } from '../services/institution.service';

import { Roles } from 'src/features/auth/decorators/roles.decorator';

@Controller('institutions')
export class InstitutionController {
  constructor(private readonly service: InstitutionService) {}

  @Get()
  async findByAll(): Promise<InstitutionDto[]> {
    logger.log('controller - institutions - findByAll');
    return await this.service.findByAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<InstitutionDto> {
    logger.log('controller - institutions - findById');
    return await this.service.findById(id);
  }

  @Delete(':id')
  @Roles('admin')
  async deleteById(@Param('id') id: string): Promise<void> {
    logger.log('controller - institutions - deleteById');
    await this.service.deleteById(id);
  }

  @Post()
  @Roles('admin')
  async create(
    @Body() body: CreateInstitutionRequestDto,
  ): Promise<InstitutionDto> {
    logger.log('controller - institutions - create');
    return await this.service.create(body);
  }
}
