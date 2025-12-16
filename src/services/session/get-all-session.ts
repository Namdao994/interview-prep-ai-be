import env from '@configs/env'
import Session, { ISession } from '@models/Session'
import { Types } from 'mongoose'

const getAllSessionService = async (
  limitQuery: string,
  offsetQuery: string
): Promise<{
  limit: number
  query: number
  totalSession: number
  sessions: (ISession & {
    _id: Types.ObjectId
  })[]
}> => {
  const limit = parseInt(limitQuery || env.DEFAULT_LIMIT_QUERY)
  const query = parseInt(offsetQuery || env.DEFAULT_OFFSET_QUERY)

  const totalSession = await Session.countDocuments()
  const sessions = await Session.find()
    .select('-__v')
    .limit(limit)
    .skip(query)
    .lean()
    .exec()

  return {
    limit,
    query,
    totalSession,
    sessions
  }
}

export default getAllSessionService
