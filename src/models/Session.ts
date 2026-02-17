/**
 * Node modules
 */

import { model, Schema, Types } from 'mongoose'
import type { ISession } from '@interfaces/session'
import { SESSION_STATUS, SESSION_SETUP_STATUS } from '@constants/session'
const sessionSchema = new Schema<ISession>(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: 'User'
    },
    lifecycleStatus: {
      type: String,
      enum: SESSION_STATUS,
      required: true,
      default: SESSION_STATUS.ACTIVE
    },
    setupStatus: {
      type: String,
      enum: SESSION_SETUP_STATUS,
      required: true,
      default: SESSION_SETUP_STATUS.CREATED
    },
    targetRole: {
      type: String,
      required: true
    },
    experience: { type: Number, required: true },
    topicsToFocus: { type: String, required: true },
    description: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default model<ISession>('Session', sessionSchema)
