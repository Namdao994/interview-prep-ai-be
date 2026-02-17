import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

const deleteMyAccountValidation = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    confirmationText: Joi.string().trim().strict().required()
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

export default deleteMyAccountValidation
