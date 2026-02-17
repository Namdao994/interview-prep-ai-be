import { Types } from 'mongoose'
import { PickedQuestion } from '../interfaces/question'
import { ModelDocument } from '../interfaces/common'

export type PickedSession = Omit<
  ModelDocument<SessionResponseDto>,
  '_id' | 'userId'
> & {
  id: string
}

export enum SESSION_STATUS {
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED'
}

export enum SESSION_SETUP_STATUS {
  CREATED = 'CREATED',
  INITIALIZING = 'INITIALIZING',
  READY = 'READY'
}

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
