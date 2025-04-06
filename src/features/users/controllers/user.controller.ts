import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { logger } from 'src/common/utils/logger';
import { Roles } from 'src/features/auth/decorators/roles.decorator';
import { UserOpenDto } from '../data/model/user-open.dto';
import { CreateUserRequestDto } from '../data/request/create-user.request.dto';
import { CurrentUser, ICurrentUser } from '../decorators/user.decorator';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  @Roles('admin')
  async findAll(): Promise<UserOpenDto[]> {
    logger.info('controller - users - findAll');
    return await this.service.findAll();
  }

  @Get('self')
  async self(@CurrentUser() currentUser: ICurrentUser): Promise<UserOpenDto> {
    logger.info('controller - users - findById');
    return await this.service.findById(currentUser.id);
  }

  @Delete(':id')
  @Roles('admin')
  async deleteById(@Param('id') id: string): Promise<void> {
    logger.info('controller - institutions - deleteById');
    await this.service.deleteById(id);
  }

  @Post()
  async create(@Body() body: CreateUserRequestDto): Promise<UserOpenDto> {
    logger.info('controller - users - create');
    return await this.service.create(body);
  }
}
