import { Controller, Get, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './user/dto/Login.dto'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello()
  }

  @Post('login')
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password)
  }
}
