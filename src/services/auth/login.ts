import env from '@configs/env'
import User from '@models/User'
import ApiError from '@utils/api-error'
import { PickedUser, pickUser } from '@utils/pickers'
import bcrypt from 'bcryptjs'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
const loginService = async (
  email: string,
  password: string
): Promise<{
  accessToken: string
  refreshToken: string
  pickedUser: PickedUser
}> => {
  const user = await User.findOne({ 'email.value': email })
    .select('+password roleId profile email')
    .lean()
    .exec()
  if (!user) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid email or password')
  }
  // Dành cho trường hợp đăng nhập bằng oauth rồi thì password sẽ là null
  if (!user.password) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid email or password')
  }
  if (!bcrypt.compareSync(password, user.password)) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid email or password')
  }

  const accessToken = jwt.sign(
    { id: user._id, roleId: user.roleId },
    env.JWT_SECRET,
    {
      expiresIn: env.ACCESS_TOKEN_LIFETIME
    }
  )
  const refreshToken = jwt.sign(
    { id: user._id, roleId: user.roleId },
    env.JWT_SECRET,
    {
      expiresIn: env.REFRESH_TOKEN_LIFETIME
    }
  )
  const pickedUser = pickUser(user)
  return {
    accessToken,
    refreshToken,
    pickedUser
  }
}

export default loginService
