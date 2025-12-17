import User from '@models/User'
import ApiError from '@utils/api-error'
import { PickedUser, pickUser } from '@utils/pickers'
import { StatusCodes } from 'http-status-codes'
import { Types } from 'mongoose'

const getUserByIdService = async (userId: string): Promise<PickedUser> => {
  if (!Types.ObjectId.isValid(userId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid id')
  }

  const user = await User.findById(userId).lean().exec()

  if (!user) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'User not found')
  }
  return pickUser(user)
}

export default getUserByIdService
