import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'

import { AuthService } from './auth.service'
import { SigninDto } from '../user/dto/signin.dto'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { ResponseData } from '../../common/interfaces/response-data.interface'
import { IUser } from '../user/entities/user.entity'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth_signin')
  async signin({
    email,
    password,
  }: SigninDto): Promise<ResponseData<{ accessToken: string }>> {
    const data = await this.authService.signin(email, password)
    return {
      data,
      message: 'Signin successfully',
    }
  }

  @MessagePattern('auth_signup')
  async signup(newUser: CreateUserDto): Promise<ResponseData<IUser>> {
    const data = await this.authService.signup(newUser)

    return {
      data,
      message: 'Signup successfully',
    }
  }
}
