import { Types } from 'mongoose'
import { IUser } from '@models/User'
import lodash from 'lodash'
import { ISession } from '@models/Session'
import { IQuestion } from '@models/Question'

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

export type PickedSession = Omit<ModelDocument<ISession>, '__v'>

export const pickSession = (
  session: ModelDocument<ISession>
): PickedSession => {
  return lodash.omit(session, ['__v'])
}

export type PickedQuestion = Omit<ModelDocument<IQuestion>, '__v'>

export const pickQuestion = (
  question: ModelDocument<IQuestion>
): PickedQuestion => {
  return lodash.omit(question, ['__v'])
}
