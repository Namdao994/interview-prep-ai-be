import env from '@configs/env'
import ApiError from '@utils/api-error'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
const refreshTokenService = (
  refreshToken: string
): {
  newAccessToken: string
  newRefreshToken: string
} => {
  if (!refreshToken) {
    throw new ApiError(StatusCodes.GONE, 'Logout successfully')
  }
  const { id } = jwt.verify(refreshToken, env.JWT_SECRET) as { id: string }
  if (!id) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid token')
  }

  const newAccessToken = jwt.sign({ id }, env.JWT_SECRET, {
    expiresIn: env.ACCESS_TOKEN_LIFETIME
  })
  const newRefreshToken = jwt.sign({ id }, env.JWT_SECRET, {
    expiresIn: env.REFRESH_TOKEN_LIFETIME
  })

  return {
    newAccessToken,
    newRefreshToken
  }
}

export default refreshTokenService
