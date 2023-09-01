import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './user/schema/user.schema'
import { Model } from 'mongoose'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name)
    private userScheme: Model<
      User,
      unknown,
      { comparePassword(pwd: string): boolean }
    >,
  ) {}

  getHello(): string {
    return 'Hello World!'
  }

  async login(email: string, password: string) {
    const user = await this.userScheme.findOne({ email })
    const isValid = user.comparePassword(password)

    if (!isValid) {
      throw new BadRequestException('Invalid credentials')
    }

    const payload = { email: user.email, sub: user._id }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
