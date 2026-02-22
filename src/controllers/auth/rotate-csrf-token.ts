import type { Request, Response, NextFunction } from 'express'
import crypto from 'crypto'
import { StatusCodes } from 'http-status-codes'
const rotateCsrfTokenController = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const csrfToken = crypto.randomBytes(32).toString('hex')

    res.status(StatusCodes.OK).json({
      message: 'Rotated',
      data: {
        csrfToken
      }
    })
  } catch (error) {
    next(error)
  }
}

export default rotateCsrfTokenController
