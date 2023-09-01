import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

import { AppModule } from './app.module'

async function bootstrap() {
  const configService = new ConfigService()
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: configService.get('PORT'),
        host: configService.get('HOST'),
      },
    },
  )

  app.useGlobalPipes(new ValidationPipe())
  await app.listen()
}
bootstrap()
