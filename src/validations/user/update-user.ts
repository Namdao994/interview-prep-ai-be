import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

const updateUserValidation = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    name: Joi.string()
      .trim()
      .strict()
      .required()
      .min(3)
      .message('Username must be at least 3 characters')
      .max(32)
      .message('Username must be at most 32 characters')
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

export default updateUserValidation
