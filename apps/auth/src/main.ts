import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AuthModule } from './auth.module'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const configService = new ConfigService()
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.TCP,
      options: {
        port: configService.get('PORT'),
        host: configService.get('HOST'),
      },
    },
  )
  await app.listen()
}
bootstrap()
