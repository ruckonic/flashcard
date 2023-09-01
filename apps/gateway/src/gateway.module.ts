import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { GatewayController } from './gateway.controller'
import { GatewayService } from './gateway.service'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.registerAsync({
      clients: [
        {
          name: 'FLASHCARD_SERVICE',
          useFactory(configService: ConfigService) {
            return {
              transport: Transport.TCP,
              options: {
                port: configService.get('FLASHCARD_PORT'),
                host: configService.get('FLASHCARD_HOST'),
              },
            }
          },
          inject: [ConfigService],
        },
      ],
    }),
    AuthModule,
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
