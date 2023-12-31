import { Module } from '@nestjs/common'
import { FlashcardController } from './flashcard.controller'
import { FlashcardService } from './flashcard.service'

@Module({
  imports: [],
  controllers: [FlashcardController],
  providers: [FlashcardService],
})
export class FlashcardModule {}
