import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

const verifyEmailOtpValidation = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Email is invalid',
      'any.required': 'Email is required'
    }),

    code: Joi.string()
      .length(6)
      .pattern(/^[0-9]{6}$/)
      .required()
      .messages({
        'string.length': 'OTP must be exactly 6 digits',
        'string.pattern.base': 'OTP must contain only numbers',
        'any.required': 'OTP is required'
      })
  })
    .required()
    .messages({
      'any.required': 'Invalid verify email payload'
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

export default verifyEmailOtpValidation
