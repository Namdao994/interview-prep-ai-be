import lodash from 'lodash'
import { ModelDocument } from '@interfaces/common'
import { IQuestion, PickedQuestion } from '@interfaces/question'
import { PickedSession, SessionResponseDto } from '@interfaces/session'
import type { IUser } from '@interfaces/user'

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

export const pickSession = (
  session: ModelDocument<SessionResponseDto>
): PickedSession => {
  const { _id, userId, ...rest } = session

  return {
    ...rest,
    id: _id.toString()
  }
}

export const pickQuestion = (
  question: ModelDocument<IQuestion>
): PickedQuestion => {
  const { _id, ...rest } = question

  return {
    ...rest,
    id: _id.toString()
  }
}
