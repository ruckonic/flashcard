import { Controller } from '@nestjs/common'
import { FlashcardService } from './flashcard.service'
import { MessagePattern } from '@nestjs/microservices'

@Controller()
export class FlashcardController {
  constructor(private readonly appService: FlashcardService) {}

  @MessagePattern('create_flashcard')
  getHello(...args: any[]) {
    return this.appService.createFlashcard(...args)
  }

  @MessagePattern({ cmd: 'sum' })
  accumulate(data: number[]): number {
    return (data || []).reduce((a, b) => a + b)
  }
}
