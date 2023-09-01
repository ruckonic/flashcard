import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { GatewayController } from './gateway.controller'
import { GatewayService } from './gateway.service'

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
        {
          name: 'AUTH_SERVICE',
          useFactory(configService: ConfigService) {
            return {
              transport: Transport.TCP,
              options: {
                port: configService.get('AUTH_PORT'),
                host: configService.get('AUTH_HOST'),
              },
            }
          },
          inject: [ConfigService],
        },
      ],
    }),
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
