import { Body, Controller, Post } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { AuthService } from './auth.service'
import { UserCredentials, UserRegister } from './auth.types'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  signin(@Body() credentials: UserCredentials) {
    return firstValueFrom(this.authService.signin(credentials))
  }

  @Post('/signup')
  signup(@Body() newUser: UserRegister) {
    console.log({ newUser })
    return firstValueFrom(this.authService.signup(newUser))
  }
}
