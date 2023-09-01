import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModelName, UserSchema } from './schema/user.schema'

const UserFeatModule = MongooseModule.forFeature([
  {
    name: UserModelName,
    schema: UserSchema,
  },
])

@Module({
  imports: [UserFeatModule],
  exports: [UserFeatModule],
})
export class UserModule {}
