/**
 * Node modules
 */
import { model, Schema, Types } from 'mongoose'

export interface ISession {
  userId: Types.ObjectId
  targetRole: string
  experience: string
  topicsToFocus: string
  description: string
  questions: Types.ObjectId[]
}

const sessionSchema = new Schema<ISession>(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: 'User'
    },
    targetRole: {
      type: String,
      required: true
    },
    experience: { type: String, required: true },
    topicsToFocus: { type: String, required: true },
    description: {
      type: String
    },
    questions: [{ type: Types.ObjectId, ref: 'Question' }]
  },
  {
    timestamps: true
  }
)

export default model<ISession>('Session', sessionSchema)
