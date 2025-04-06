import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { logger } from 'src/common/utils/logger';
import {
  CurrentUser,
  ICurrentUser,
} from 'src/features/users/decorators/user.decorator';
import { MaintenceDto } from '../data/model/maintence.dto';
import { CreateMaintenceRequestDto } from '../data/request/create-maintence.request.dto';
import { MaintenceService } from '../services/maintence.service';
import { SyncMaintenceRequestDto } from '../data/request/sync-maintence.request.dto';

@Controller('maintences')
export class MaintenceController {
  constructor(private readonly service: MaintenceService) {}

  @Get()
  async findAll(
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<MaintenceDto[]> {
    logger.info('controller - maintence - findAll');
    return await this.service.findAll(currentUser);
  }

  @Get(':id')
  async self(
    @Param('id') id: string,
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<MaintenceDto> {
    logger.info('controller - maintence - findById');
    return await this.service.findById(id, currentUser);
  }

  @Delete(':id')
  async deleteById(
    @Param('id') id: string,
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<void> {
    logger.info('controller - maintence - deleteById');
    await this.service.deleteById(id, currentUser);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: CreateMaintenceRequestDto,
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<MaintenceDto> {
    logger.info('controller - maintence - update');
    return await this.service.update(id, body, currentUser);
  }

  @Post()
  async create(
    @Body() body: CreateMaintenceRequestDto,
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<MaintenceDto> {
    logger.info('controller - maintence - create');
    return await this.service.create(body, currentUser);
  }

  @Post('sync')
  async syncFromClient(
    @Body() body: SyncMaintenceRequestDto[],
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<{ success: boolean }> {
    logger.info('controller - maintence - syncFromClient');
    return await this.service.syncFromClient(currentUser, body);
  }

  @Get('sync')
  async getSync(
    @Query() since: string,
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<MaintenceDto[]> {
    logger.info('controller - maintence - getSync');
    return await this.service.syncGetUpdates(currentUser, since);
  }
}
