import User from '@models/User'
import ApiError from '@utils/api-error'
import { StatusCodes } from 'http-status-codes'

const deleteUserByIdService = async (userId: string): Promise<void> => {
  const deletedUser = await User.findByIdAndDelete(userId).exec()
  if (!deletedUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
  }
}

export default deleteUserByIdService
