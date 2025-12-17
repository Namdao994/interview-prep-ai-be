import ApiError from '@utils/api-error'
import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import { Types } from 'mongoose'
const togglePinQuestionValidation = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const correctCondition = Joi.object({
    isPinned: Joi.boolean().required().messages({
      'any.required': 'isPinned is required',
      'boolean.base': 'isPinned must be a boolean'
    })
  })
    .required()
    .messages({
      'any.required': 'Invalid value'
    })
  try {
    await correctCondition.validateAsync(req.body, {
      abortEarly: true,
      allowUnknown: false
    })
    const questionId = req.params.id
    if (!Types.ObjectId.isValid(questionId)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid id')
    }
    next()
  } catch (error) {
    next(error)
  }
}

export default togglePinQuestionValidation
