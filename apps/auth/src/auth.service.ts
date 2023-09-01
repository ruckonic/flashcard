import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { JwtService } from '@nestjs/jwt'
import { User, UserModel } from './user/schema/user.schema'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: UserModel,
  ) {}

  async signin(email: string, password: string) {
    const user = await this.userModel.findOne({ email })

    if (!user) {
      throw new BadRequestException('Invalid credentials')
    }

    const isValid = await user.comparePassword(password)

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
