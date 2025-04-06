import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MaintenceController } from './controllers/maintence.controller';
import {
  MaintenceEntity,
  MaintenceSchema,
} from './data/entities/maintence.entity';
import { MaintenceRepository } from './repositories/maintence.repository';
import { MaintenceService } from './services/maintence.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MaintenceEntity.name, schema: MaintenceSchema },
    ]),
  ],
  controllers: [MaintenceController],
  providers: [MaintenceService, MaintenceRepository],
  exports: [MaintenceRepository],
})
export class MaintenceModule {}
