import User from '@models/User'
import ApiError from '@utils/api-error'
import bcrypt from 'bcryptjs'
import { StatusCodes } from 'http-status-codes'

const changePasswordService = async (
  userId: string,
  password: string,
  newPassword: string
) => {
  const user = await User.findById(userId).select('+password')

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Password is incorrect')
  }

  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(newPassword, salt)

  await user.save()
}

export default changePasswordService
