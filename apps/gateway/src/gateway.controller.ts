import { Controller, Get } from '@nestjs/common'
import { GatewayService } from './gateway.service'
import { firstValueFrom } from 'rxjs'

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get('/flashcard')
  async getHello() {
    const dat = await firstValueFrom(this.gatewayService.getFlashcardHello())

    return dat
  }

  @Get('/sum')
  async getSum() {
    const dat = await firstValueFrom(this.gatewayService.getSum())

    return dat
  }
}
