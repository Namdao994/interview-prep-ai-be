import { Types } from 'mongoose'
import { PickedQuestion } from './question'
import { ModelDocument } from './common'

export type PickedSession = Omit<
  ModelDocument<SessionResponseDto>,
  '_id' | 'userId'
> & {
  id: string
}

import { SESSION_STATUS, SESSION_SETUP_STATUS } from '@constants/session'

export interface ISession {
  userId: Types.ObjectId
  lifecycleStatus: SESSION_STATUS
  setupStatus: SESSION_SETUP_STATUS
  targetRole: string
  experience: number
  topicsToFocus: string
  description: string
}

export interface SessionResponseDto extends ISession {
  questionCount?: number
  questions?: PickedQuestion[]
}

export interface UpdateSessionDto {
  lifecycleStatus?: SESSION_STATUS
  setupStatus?: SESSION_SETUP_STATUS
  targetRole?: string
  experience?: number
  topicsToFocus?: string
  description?: string
}
