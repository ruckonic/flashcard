import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Model, SchemaTypes, Types } from 'mongoose'
import * as bcrypt from 'bcrypt'

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId

  @Prop()
  name: string

  @Prop()
  email: string

  @Prop()
  password: string
}

export type UserModel = Model<
  User,
  unknown,
  { comparePassword: (password: string) => boolean }
>

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.pre('save', async function pre() {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function comparePassword(
  candidatePassword: string,
) {
  return bcrypt.compare(candidatePassword, this.password)
}
