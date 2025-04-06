import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { logger } from 'src/common/utils/logger';
import { Roles } from 'src/features/auth/decorators/roles.decorator';
import { UserOpenDto } from '../data/model/user-open.dto';
import { CreateUserRequestDto } from '../data/request/create-user.request.dto';
import { FirstLoginRequestDto } from '../data/request/first-login.request.dto';
import { CurrentUser, ICurrentUser } from '../decorators/user.decorator';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  @Roles('admin')
  async findByAll(): Promise<UserOpenDto[]> {
    logger.log('controller - users - findByAll');
    return await this.service.findByAll();
  }

  @Get('self')
  async self(@CurrentUser() currentUser: ICurrentUser): Promise<UserOpenDto> {
    logger.log('controller - users - findById');
    return await this.service.findById(currentUser.id);
  }

  @Delete(':id')
  @Roles('admin')
  async deleteById(@Param('id') id: string): Promise<void> {
    logger.log('controller - institutions - deleteById');
    await this.service.deleteById(id);
  }

  @Post()
  async create(@Body() body: CreateUserRequestDto): Promise<UserOpenDto> {
    logger.log('controller - users - create');
    return await this.service.create(body);
  }

  @Put('/first-login')
  async firstLogin(
    @CurrentUser() currentUser: ICurrentUser,
    @Body() body: FirstLoginRequestDto,
  ): Promise<UserOpenDto> {
    logger.log('controller - users - firstLogin');
    return await this.service.firstLogin(
      currentUser.id,
      body.institutionId,
      body.institutionName,
    );
  }
}
