import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import { SESSION_STATUS, SESSION_SETUP_STATUS } from '@constants/session'

const updateSessionValidation = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    lifecycleStatus: Joi.string().valid(
      SESSION_STATUS.ACTIVE,
      SESSION_STATUS.ARCHIVED
    ),

    setupStatus: Joi.string().valid(
      SESSION_SETUP_STATUS.CREATED,
      SESSION_SETUP_STATUS.INITIALIZING,
      SESSION_SETUP_STATUS.READY
    ),

    targetRole: Joi.string().trim().strict(),

    experience: Joi.number().min(0).messages({
      'number.base': 'Experience must be a number',
      'number.min': 'Experience must be greater than or equal to 0'
    }),

    topicsToFocus: Joi.string().trim().strict(),

    description: Joi.string().trim().strict()
  })
    .min(1) // ⚠️ BẮT BUỘC có ít nhất 1 field
    .required()
    .messages({
      'object.min': 'At least one field must be updated',
      'any.required': 'Invalid update payload'
    })

  try {
    await schema.validateAsync(req.body, {
      abortEarly: true,
      allowUnknown: false // ❌ cấm field ngoài DTO
    })
    next()
  } catch (error) {
    next(error)
  }
}

export default updateSessionValidation
