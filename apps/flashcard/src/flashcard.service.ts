import { Injectable } from '@nestjs/common'

@Injectable()
export class FlashcardService {
  getHello(): string {
    return 'Hello World!'
  }

  async createFlashcard(...data: any[]) {
    return {
      data,
      message: 'hello from flashcard',
    }
  }
}
