import { Controller, Delete, Get, Put } from '@nestjs/common'
import { GatewayService } from './gateway.service'

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get('/flashcard')
  async getFlashcards() {
    return []
  }

  @Get('/flashcard/:id')
  async getFlashcard() {
    return {}
  }

  @Delete('/flashcard/:id')
  async deleteFlashcard() {
    return {}
  }

  @Put('/flashcard/:id')
  async updateFlashcard() {
    return {}
  }
}
