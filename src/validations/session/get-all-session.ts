import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

const getAllSessionValidation = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const correctCondition = Joi.object({
    limit: Joi.number().integer().min(0).optional().messages({
      'number.base': 'limit must be a number',
      'number.integer': 'limit must be an integer',
      'number.min': 'limit must be greater than or equal to 0'
    }),

    offset: Joi.number().integer().min(0).optional().messages({
      'number.base': 'offset must be a number',
      'number.integer': 'offset must be an integer',
      'number.min': 'offset must be greater than or equal to 0'
    })
  })
  try {
    await correctCondition.validateAsync(req.query, {
      abortEarly: true,
      allowUnknown: false
    })
    next()
  } catch (error) {
    next(error)
  }
}

export default getAllSessionValidation
