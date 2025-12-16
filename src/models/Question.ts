/**
 * Node modules
 */

import { model, Schema, Types } from 'mongoose'

export interface IQuestion {
  sessionId: Types.ObjectId
  question: string
  answer: string
  isPinned: boolean
  note: string
}

/**
 * Question Schema
 */
const questionSchema = new Schema<IQuestion>(
  {
    sessionId: {
      type: Types.ObjectId,
      required: true,
      ref: 'Session'
    },
    question: {
      type: String,
      required: [true, 'Question is required']
    },
    answer: {
      type: String,
      required: [true, 'Answer is required']
    },
    isPinned: {
      type: Boolean,
      default: false
    },
    note: {
      type: String
    }
  },
  { timestamps: true }
)

export default model<IQuestion>('Question', questionSchema)
