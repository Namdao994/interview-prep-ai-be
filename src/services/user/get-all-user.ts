import env from '@configs/env'
import User from '@models/User'
import { Types } from 'mongoose'
import type { IUser } from '@interfaces/user'

const getAllUserService = async (
  limitQuery: string,
  pageQuery: string
): Promise<{
  limit: number
  page: number
  totalUsers: number
  users: (IUser & {
    _id: Types.ObjectId
  })[]
}> => {
  const limit = parseInt(limitQuery || env.DEFAULT_LIMIT_QUERY)
  const page = parseInt(pageQuery || env.DEFAULT_PAGE_QUERY)
  const offset = (page - 1) * limit
  const [totalUsers, users] = await Promise.all([
    User.countDocuments(),
    User.find().select('-__v').limit(limit).skip(offset).lean().exec()
  ])
  return {
    limit,
    page,
    totalUsers,
    users
  }
}

export default getAllUserService
