import { Injectable } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { InjectModel } from '@nestjs/mongoose'
import { JwtService } from '@nestjs/jwt'

import { UserModelName, UserModel } from '../user/schema/user.schema'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { IUser } from '../user/entities/user.entity'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(UserModelName) private readonly userModel: UserModel,
  ) {}

  async signin(email: string, password: string) {
    const user = await this.userModel.findOne({ email }, { password: true })

    if (!user) {
      throw new RpcException({ message: 'Invalid credentials' })
    }

    const isValidPassword = await user.comparePassword(password)

    if (!isValidPassword) {
      throw new RpcException({ message: 'Invalid credentials' })
    }

    const token = await this.jwtService.signAsync({
      email: user.email,
      sub: user._id,
    })

    return {
      accessToken: token,
    }
  }

  async signup(newUser: CreateUserDto) {
    const userCreated = await this.userModel.create(newUser)
    const user = userCreated.toObject({ useProjection: true }) as IUser
    return user
  }
}
