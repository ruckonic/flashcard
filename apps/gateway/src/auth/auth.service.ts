import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { type Observable } from 'rxjs'
import type {
  AuthToken,
  UserCreated,
  UserCredentials,
  UserRegister,
} from './auth.types'

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  signin(userCredentials: UserCredentials): Observable<AuthToken> {
    return this.authClient.send('auth_signin', userCredentials)
  }

  signup(newUser: UserRegister): Observable<UserCreated> {
    return this.authClient.send('auth_signup', newUser)
  }
}
