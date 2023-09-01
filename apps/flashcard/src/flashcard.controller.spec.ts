import { Test, TestingModule } from '@nestjs/testing'
import { FlashcardController } from './flashcard.controller'
import { FlashcardService } from './flashcard.service'

describe('AppController', () => {
  let appController: FlashcardController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FlashcardController],
      providers: [FlashcardService],
    }).compile()

    appController = app.get<FlashcardController>(FlashcardController)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!')
    })
  })
})
