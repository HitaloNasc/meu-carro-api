import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from './data/entities/user.entity';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
  ],
  exports: [UserRepository],
})
export class UserModule { }
