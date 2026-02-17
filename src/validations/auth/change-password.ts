import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

const changePasswordValidation = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    password: Joi.string()
      .required()
      .trim()
      .strict()
      .min(8)
      .message('Password must be at least 8 characters'),
    newPassword: Joi.string()
      .required()
      .trim()
      .strict()
      .min(8)
      .message('Password must be at least 8 characters')
  })
    .required()
    .messages({
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

export default changePasswordValidation
