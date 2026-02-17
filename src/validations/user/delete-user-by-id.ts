import ApiError from '@utils/api-error'
import { Response, Request, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Types } from 'mongoose'
const deleteUserByIdValidation = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id
    if (!Types.ObjectId.isValid(userId)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid id')
    }
    next()
  } catch (error) {
    next(error)
  }
}

export default deleteUserByIdValidation
