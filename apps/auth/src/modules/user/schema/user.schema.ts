import * as bcrypt from 'bcrypt'
import { SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Model } from 'mongoose'

import { User } from '../model/user.model'

export const UserModelName = User.name
export const UserSchema = SchemaFactory.createForClass(User)
export type UserModel = Model<
  User,
  unknown,
  {
    comparePassword(
      this: HydratedDocument<User>,
      candidatePassword: string,
    ): Promise<boolean>
  }
>

/**
 * Hash the password before saving the user
 */
UserSchema.pre('save', async function pre() {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
})

/**
 * Custom method to compare the password hash with the given password
 * bind automatically in the user document
 */
UserSchema.methods.comparePassword = async function comparePassword(
  this: HydratedDocument<User>,
  candidatePassword: string,
) {
  return bcrypt.compare(candidatePassword, this.password)
}
