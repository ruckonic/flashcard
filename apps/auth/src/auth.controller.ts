import { Controller } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SigninDto, SignupDto } from './user/dto/Signin.dto'
import { MessagePattern } from '@nestjs/microservices'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth_signin')
  signin({ email, password }: SigninDto) {
    return this.authService.signin(email, password)
  }

  @MessagePattern('auth_signup')
  signup(newUser: SignupDto) {
    return this.authService.signup(newUser)
  }
}
