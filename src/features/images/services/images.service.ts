import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';

@Injectable()
export class ImagesService {
  private readonly s3Client: S3Client;
  private readonly bucket: string;

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
    this.bucket = this.configService.get('AWS_BUCKET_NAME');
  }

  async uploadFile(file: Express.Multer.File, folder: string) {
    const upload = new Upload({
      client: this.s3Client,
      params: {
        Bucket: this.bucket,
        Key: `${folder}/${Date.now()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      },
    });

    const result = await upload.done();
    return result.Location;
  }

  async getFileStream(key: string): Promise<Readable> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    const response = await this.s3Client.send(command);
    return response.Body as Readable;
  }
}
