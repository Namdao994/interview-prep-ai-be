import env from '@configs/env'
import refreshTokenService from '@services/auth/refresh-token'
import type { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import ms from 'ms'
import crypto from 'crypto'
const refreshTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies.refreshToken as string
    const { newAccessToken, newRefreshToken } =
      await refreshTokenService(refreshToken)
    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: ms(env.ACCESS_TOKEN_COOKIE)
    })
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: ms(env.REFRESH_TOKEN_COOKIE)
    })
    const csrfToken = crypto.randomBytes(32).toString('hex')
    res.cookie('csrfToken', csrfToken, {
      httpOnly: false,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: ms(env.CSRF_TOKEN_COOKIE)
    })

    res.status(StatusCodes.OK).json({
      message: 'Refresh token successfully'
    })
  } catch (error) {
    next(error)
  }
}

export default refreshTokenController
