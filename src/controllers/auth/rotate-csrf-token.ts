import type { Request, Response, NextFunction } from 'express'
import crypto from 'crypto'
import ms from 'ms'
import env from '@configs/env'
import { StatusCodes } from 'http-status-codes'
const rotateCsrfTokenController = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const csrfToken = crypto.randomBytes(32).toString('hex')
    res.cookie('csrfToken', csrfToken, {
      httpOnly: false,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: ms(env.CSRF_TOKEN_COOKIE)
    })
    res.status(StatusCodes.OK).json({ message: 'Rotated' })
  } catch (error) {
    next(error)
  }
}

export default rotateCsrfTokenController
