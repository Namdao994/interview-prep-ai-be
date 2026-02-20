import env from '@configs/env'
import { ErrorCode } from '@constants/error-codes'
import ApiError from '@utils/api-error'
import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt, {
  JsonWebTokenError,
  TokenExpiredError,
  NotBeforeError,
  JwtPayload
} from 'jsonwebtoken'

const authenticateMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  // lấy Authorization header
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return next(
      new ApiError(
        StatusCodes.UNAUTHORIZED,
        'Authentication required',
        ErrorCode.NO_TOKEN
      )
    )
  }

  // format: Bearer token
  const parts = authHeader.split(' ')

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return next(
      new ApiError(
        StatusCodes.UNAUTHORIZED,
        'Invalid authorization format',
        ErrorCode.INVALID_TOKEN
      )
    )
  }

  const accessToken = parts[1]

  try {
    const jwtVerified = jwt.verify(
      accessToken,
      env.JWT_SECRET
    ) as JwtPayload & { id: string; roleId: string }

    req.jwtVerified = jwtVerified

    next()
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return next(
        new ApiError(
          StatusCodes.UNAUTHORIZED,
          'Access token expired',
          ErrorCode.TOKEN_EXPIRED
        )
      )
    }

    if (error instanceof JsonWebTokenError || error instanceof NotBeforeError) {
      return next(
        new ApiError(
          StatusCodes.UNAUTHORIZED,
          'Invalid token',
          ErrorCode.INVALID_TOKEN
        )
      )
    }

    return next(error)
  }
}

export default authenticateMiddleware
