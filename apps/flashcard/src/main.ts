import { NestFactory } from '@nestjs/core'
import { FlashcardModule } from './flashcard.module'
import { TcpClientOptions, Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const configService = new ConfigService()
  const app = await NestFactory.createMicroservice<TcpClientOptions>(
    FlashcardModule,
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
