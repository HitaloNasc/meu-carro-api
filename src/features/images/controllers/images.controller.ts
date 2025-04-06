import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ImagesService } from '../services/images.service';

@Controller('files')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const folder = 'images';
    const url = await this.imagesService.uploadFile(file, folder);
    return { url };
  }

  @Get('image/:key')
  async getImage(@Param('key') key: string, @Res() res: Response) {
    const fileStream = await this.imagesService.getFileStream(`images/${key}`);
    fileStream.pipe(res);
  }
}
