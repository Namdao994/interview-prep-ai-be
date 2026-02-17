import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
const loginValidation = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const correctCondition = Joi.object({
    email: Joi.string()
      .trim()
      .strict()
      .required()
      .pattern(/^\S+@\S+\.\S+$/)
      .message('Invalid email or password'),
    password: Joi.string()
      .trim()
      .strict()
      .required()
      .min(8)
      .message('Invalid email or password')
  })
    .required()
    .messages({
      'any.required': 'Invalid email or password'
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

export default loginValidation
