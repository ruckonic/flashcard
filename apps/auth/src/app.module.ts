import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { AuthModule } from './modules/auth/auth.module'

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
    AuthModule,
  ],
})
export class AppModule {}
