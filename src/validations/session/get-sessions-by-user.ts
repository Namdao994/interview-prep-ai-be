import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import { SESSION_STATUS } from '@constants/session'

const SESSION_STATUSES = Object.values(SESSION_STATUS)

const getSessionsByUserValidation = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const correctCondition = Joi.object({
    status: Joi.string()
      .custom((value: string, helpers) => {
        const statuses = value.split(',').map((s) => s.trim())
        const isValid = statuses.every((s) =>
          SESSION_STATUSES.includes(s as any)
        )
        if (!isValid) {
          return helpers.error('any.only')
        }
        return value.trim()
      })
      .optional()
      .messages({
        'any.only': 'status must be one of ACTIVE, ARCHIVED',
        'string.base': 'status must be a string'
      }),
    keyword: Joi.string().trim().min(1).max(100).optional().messages({
      'string.base': 'keyword must be a string',
      'string.min': 'keyword cannot be empty',
      'string.max': 'keyword is too long'
    }),
    limit: Joi.number().integer().min(0).optional().messages({
      'number.base': 'limit must be a number',
      'number.integer': 'limit must be an integer',
      'number.min': 'limit must be greater than or equal to 0'
    }),

    page: Joi.number().integer().min(0).optional().messages({
      'number.base': 'page must be a number',
      'number.integer': 'page must be an integer',
      'number.min': 'page must be greater than or equal to 0'
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

export default getSessionsByUserValidation
