import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Model, SchemaTypes, Types } from 'mongoose'
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
  {
    comparePassword: (
      this: HydratedDocument<User>,
      password: string,
    ) => Promise<boolean>
  }
>

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.pre('save', async function pre() {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = comparePassword

async function comparePassword(
  this: HydratedDocument<User>,
  candidatePassword: string,
) {
  return bcrypt.compare(candidatePassword, this.password)
}
