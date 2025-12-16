import env from '@configs/env'
import refreshTokenService from '@services/auth/refresh-token'
import type { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import ms from 'ms'
const refreshTokenController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies.refreshToken as string
    const { newAccessToken, newRefreshToken } =
      refreshTokenService(refreshToken)

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: ms(env.ACCESS_TOKEN_LIFETIME)
    })
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: ms(env.REFRESH_TOKEN_LIFETIME)
    })
    res.status(StatusCodes.OK).json({
      message: 'Refresh token successfully'
    })
  } catch (error) {
    next(error)
  }
}

export default refreshTokenController
