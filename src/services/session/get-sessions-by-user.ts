import env from '@configs/env'
import Session, { ISession } from '@models/Session'
import { Types } from 'mongoose'

const getSessionsByUserService = async (
  limitQuery: string,
  offsetQuery: string,
  userId: string
): Promise<{
  limit: number
  offset: number
  totalSession: number
  sessions: (ISession & {
    _id: Types.ObjectId
  })[]
}> => {
  const limit = parseInt(limitQuery || env.DEFAULT_LIMIT_QUERY)
  const offset = parseInt(offsetQuery || env.DEFAULT_OFFSET_QUERY)

  const totalSession = await Session.countDocuments()
  const sessions = await Session.find({ userId })
    .populate({
      path: 'questions',
      options: { sort: { createdAt: -1 } }
    })
    .select('-__v')
    .limit(limit)
    .skip(offset)
    .lean()
    .exec()

  return { limit, offset, totalSession, sessions }
}

export default getSessionsByUserService
