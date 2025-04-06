import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MaintenceEntity extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ default: null })
  description?: string;

  @Prop({ default: null })
  odometer?: number;

  @Prop({ required: true, default: null })
  performedAt: Date;

  @Prop({ required: true, default: null })
  nextDueAt: Date;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updatedAt?: Date;
}

export const MaintenceSchema = SchemaFactory.createForClass(MaintenceEntity);
