import { Module } from '@nestjs/common';
import { ImagesService } from './services/images.service';
import { ImagesController } from './controllers/images.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [ImagesService],
  controllers: [ImagesController],
  exports: [ImagesService],
})
export class ImagesModule {}
