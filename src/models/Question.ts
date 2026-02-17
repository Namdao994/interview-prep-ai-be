/**
 * Node modules
 */

import { model, Schema, Types } from 'mongoose'
import type {
  IAnswer,
  IAnswerBlock,
  IDiscussion,
  IDiscussionBlock,
  IQuestion
} from '@interfaces/question'

const AnswerBlockSchema = new Schema<IAnswerBlock>(
  {
    type: {
      type: String,
      required: true,
      enum: ['text', 'code']
    },
    content: {
      type: String,
      required: true
    },
    language: {
      type: String
    }
  },
  { _id: false }
)

const AnswerSchema = new Schema<IAnswer>(
  {
    blocks: {
      type: [AnswerBlockSchema],
      required: true
    }
  },
  { _id: false }
)

const DiscussionBlockSchema = new Schema<IDiscussionBlock>(
  {
    type: {
      type: String,
      enum: ['text', 'code'],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    language: {
      type: String
    }
  },
  { _id: false }
)

const DiscussionSchema = new Schema<IDiscussion>(
  {
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true
    },
    blocks: {
      type: [DiscussionBlockSchema],
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { _id: false }
)

/**
 * Question Schema
 */
const questionSchema = new Schema<IQuestion>(
  {
    _id: {
      type: Types.ObjectId,
      required: true
    },
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
      type: AnswerSchema,
      required: [true, 'Answer is required']
    },
    isPinned: {
      type: Boolean,
      default: false
    },

    discussion: {
      type: [DiscussionSchema],
      default: []
    }
  },
  { timestamps: true, versionKey: false }
)

export default model<IQuestion>('Question', questionSchema)
