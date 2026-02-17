import { Types } from 'mongoose'

export type ModelDocument<T> = T & {
  _id: Types.ObjectId
}
