import { Controller } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto, SignupDto } from './user/dto/Login.dto'
import { MessagePattern } from '@nestjs/microservices'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth_login')
  login({ email, password }: LoginDto) {
    return this.authService.login(email, password)
  }

  @MessagePattern('auth_signup')
  signup(newUser: SignupDto) {
    return this.authService.signup(newUser)
  }
}
