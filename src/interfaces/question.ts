import { Types } from 'mongoose'
import { ModelDocument } from './common'

export interface IAnswerBlock {
  type: 'text' | 'code'
  content: string
  language?: string
}

export type PickedQuestion = Omit<ModelDocument<IQuestion>, '_id'> & {
  id: string
}

export interface IAnswer {
  blocks: IAnswerBlock[]
}

export interface IQuestion {
  _id: Types.ObjectId
  sessionId: Types.ObjectId
  question: string
  answer: IAnswer
  isPinned: boolean
  discussion: IDiscussion[]
}

export type DiscussionRole = 'user' | 'assistant'

export interface IDiscussionBlock {
  type: 'text' | 'code'
  content: string
  language?: string
}

export interface IDiscussion {
  role: DiscussionRole
  blocks: IDiscussionBlock[]
  createdAt: Date
}
