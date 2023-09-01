import { Identificable } from '../../../common/interfaces/identificable.interface'
import { Timestamp } from '../../../common/interfaces/timestamp.interface'

export interface IUser extends Timestamp, Identificable {
  name: string
  email: string
}

export interface IUserCreate {
  name: string
  email: string
  password: string
}

export interface IUserUpdate extends Partial<IUserCreate> {}
