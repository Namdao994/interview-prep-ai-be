import refreshTokenService from '@services/auth/refresh-token'
import type { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import crypto from 'crypto'

const refreshTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.headers['x-refresh-token'] as string

    if (!refreshToken) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'Refresh token is required'
      })
    }

    const { newAccessToken, newRefreshToken } =
      await refreshTokenService(refreshToken)

    const csrfToken = crypto.randomBytes(32).toString('hex')

    res.status(StatusCodes.OK).json({
      message: 'Refresh token successfully',
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        csrfToken
      }
    })
  } catch (error) {
    next(error)
  }
}

export default refreshTokenController
