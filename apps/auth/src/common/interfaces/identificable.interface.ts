import { Types } from 'mongoose'

export interface Identificable {
  _id: Types.ObjectId | string
}
