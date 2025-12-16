import env from '@configs/env'
import User, { IUser } from '@models/User'
import { Types } from 'mongoose'

const getAllUserService = async (
  limitQuery: string,
  offsetQuery: string
): Promise<{
  limit: number
  offset: number
  totalUsers: number
  users: (IUser & {
    _id: Types.ObjectId
  })[]
}> => {
  const limit = parseInt(limitQuery || env.DEFAULT_LIMIT_QUERY)
  const offset = parseInt(offsetQuery || env.DEFAULT_OFFSET_QUERY)
  const totalUsers = await User.countDocuments()
  const users = await User.find()
    .select('-__v')
    .limit(limit)
    .skip(offset)
    .lean()
    .exec()

  return {
    limit,
    offset,
    totalUsers,
    users
  }
}

export default getAllUserService
