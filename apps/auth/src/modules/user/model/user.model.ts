import { Prop, Schema } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { IUser } from '../entities/user.entity'

@Schema({ timestamps: true, versionKey: false, _id: true })
export class User implements IUser {
  _id: Types.ObjectId

  @Prop()
  name: string

  @Prop()
  email: string

  @Prop({ select: false })
  password: string

  createdAt: Date
  updatedAt: Date
}
