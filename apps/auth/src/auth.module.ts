import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { User, UserSchema } from './user/schema/user.schema'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory(configService: ConfigService) {
        return {
          uri: configService.get('MONGO_URI'),
          dbName: configService.get('MONGO_DB_NAME'),
          useNewUrlParser: true,
        }
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.registerAsync({
      useFactory(configService: ConfigService) {
        console.log('JWT Modi', configService.get('JWT_SECRET'))
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRES_IN'),
          },
        }
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
