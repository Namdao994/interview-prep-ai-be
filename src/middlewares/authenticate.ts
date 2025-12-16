import env from '@configs/env'
import ApiError from '@utils/api-error'
import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt, { JwtPayload } from 'jsonwebtoken'

const authenticateMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const accessToken = req.cookies.accessToken
  console.log('accessToken', accessToken)
  if (!accessToken) {
    return next(
      new ApiError(StatusCodes.UNAUTHORIZED, 'Authentication required')
    )
  }

  try {
    const jwtVerified = jwt.verify(
      accessToken,
      env.JWT_SECRET
    ) as JwtPayload & { id: string; roleId: string }
    req.jwtVerified = jwtVerified
    next()
  } catch {
    next(new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid or expired token'))
  }
}

export default authenticateMiddleware
