import { Types } from 'mongoose'
import { IUser } from '@models/User'
import lodash from 'lodash'

export type ModelDocument<T> = T & {
  _id: Types.ObjectId
  __v: number
}

export type PickedUser = {
  name: IUser['profile']['name']
  email: IUser['email']['value']
  profileImageUrl: IUser['profile']['profileImageUrl']
}

export const pickUser = (user: ModelDocument<IUser>): PickedUser => {
  return {
    name: lodash.get(user, 'profile.name'),
    email: lodash.get(user, 'email.value'),
    profileImageUrl: lodash.get(user, 'profile.profileImageUrl')
  }
}
