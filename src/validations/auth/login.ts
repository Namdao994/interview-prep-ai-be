import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
const loginValidation = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const correctCondition = Joi.object({
    email: Joi.string()
      .required()
      .pattern(/^\S+@\S+\.\S+$/)
      .message('Email is invalid'),
    password: Joi.string()
      .required()
      .min(8)
      .message('Password must be at least 8 characters')
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
