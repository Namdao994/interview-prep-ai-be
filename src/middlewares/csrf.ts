import { ErrorCode } from '@constants/error-codes'
import ApiError from '@utils/api-error'
import type { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
const csrfMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  try {
    if (req.method === 'GET') return next()

    const csrfTokenFromHeader = req.headers['x-csrf-token']
    const csrfTokenFromCookie = req.cookies.csrfToken

    if (!csrfTokenFromHeader || csrfTokenFromHeader !== csrfTokenFromCookie) {
      throw new ApiError(
        StatusCodes.FORBIDDEN,
        'CSRF token expired',
        ErrorCode.CSRF_TOKEN_EXPIRED
      )
    }

    next()
  } catch (error) {
    next(error)
  }
}

export default csrfMiddleware
