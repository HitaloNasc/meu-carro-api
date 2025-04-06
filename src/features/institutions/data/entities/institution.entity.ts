import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class InstitutionEntity extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  email: string;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updatedAt?: Date;
}

export const InstitutionSchema = SchemaFactory.createForClass(InstitutionEntity);
