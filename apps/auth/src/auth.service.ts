import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { JwtService } from '@nestjs/jwt'
import { User, UserModel } from './user/schema/user.schema'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name)
    private userModel: UserModel,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email })
    const isValid = user.comparePassword(password)

    if (!isValid) {
      throw new BadRequestException('Invalid credentials')
    }

    const payload = { email: user.email, sub: user._id }
    const token = await this.jwtService.signAsync(payload)

    return {
      accessToken: token,
    }
  }

  signup(newUser: Pick<User, 'email' | 'name' | 'password'>) {
    return this.userModel.create(newUser)
  }
}
