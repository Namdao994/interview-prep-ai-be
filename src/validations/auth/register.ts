import type { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
const registerValidation = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  const correctCondition = Joi.object({
    email: Joi.string()
      .required()
      .trim()
      .strict()
      .pattern(/^\S+@\S+\.\S+$/)
      .message('Email is invalid'),
    password: Joi.string()
      .required()
      .trim()
      .strict()
      .min(8)
      .message('Password must be at least 8 characters'),
    name: Joi.string()
      .trim()
      .strict()
      .required()
      .min(3)
      .message('Password must be at least 3 characters')
      .max(32)
      .message('Password must be at most 32 characters')
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
    next()
  } catch (error) {
    next(error)
  }
}

export default registerValidation
