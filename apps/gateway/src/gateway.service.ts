import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { type Observable } from 'rxjs'

@Injectable()
export class GatewayService {
  constructor() {} // @Inject('FLASHCARD_SERVICE') private readonly flashcardClient: ClientProxy,

  // getFlashcardHello(): Observable<any> {
  //   return this.flashcardClient.send('create_flashcard', 'hello from gateway')
  // }

  // getSum(): Observable<number> {
  //   const pattern = { cmd: 'sum' }
  //   const data = [1, 2, 3, 4, 5]
  //   return this.flashcardClient.send<number>(pattern, data)
  // }
}
