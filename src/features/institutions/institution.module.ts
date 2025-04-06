import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InstitutionEntity, InstitutionSchema } from './data/entities/institution.entity';
import { InstitutionController } from './controllers/institution.controller';
import { InstitutionService } from './services/institution.service';
import { InstitutionRepository } from './repositories/institution.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: InstitutionEntity.name, schema: InstitutionSchema }]),
  ],
  controllers: [InstitutionController],
  providers: [
    InstitutionService,
    InstitutionRepository,
  ],
  exports: [InstitutionRepository],
})
export class InstitutionModule { }
