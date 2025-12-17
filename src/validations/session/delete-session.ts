import ApiError from '@utils/api-error'
import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Types } from 'mongoose'

const deleteSessionValidation = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const sessionId = req.params.id
    const { id: userId } = req.jwtVerified
    if (!Types.ObjectId.isValid(sessionId) || !Types.ObjectId.isValid(userId)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid id')
    }
    next()
  } catch (error) {
    next(error)
  }
}

export default deleteSessionValidation
