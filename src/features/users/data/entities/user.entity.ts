import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserProviderEnum } from 'src/common/enums/user-provider.enum';

@Schema()
export class UserEntity extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: null })
  password?: string;

  @Prop({ default: null })
  photo?: string;

  @Prop({ default: 'user' })
  role?: string;

  @Prop({ enum: UserProviderEnum, default: null })
  provider?: UserProviderEnum;

  @Prop({ default: null })
  userProviderId?: string;

  @Prop({ default: null })
  institutionId?: string;

  @Prop({ default: null })
  institutionName?: string;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
