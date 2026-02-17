import { Response, Request, NextFunction } from 'express'
import Joi from 'joi'
const createSessionValidation = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const correctCondition = Joi.object({
    targetRole: Joi.string().trim().strict().required().messages({
      'any.required': 'Role is required'
    }),
    experience: Joi.number().min(0).required().messages({
      'any.required': 'Experience is required',
      'number.base': 'Experience must be a number',
      'number.min': 'Experience must be greater than or equal to 0'
    }),
    topicsToFocus: Joi.string().required().messages({
      'any.required': 'Topics to focus is required'
    }),
    description: Joi.string().trim().strict()
    // numberOfQuestions: Joi.string()
    //   .trim()
    //   .strict()
    //   .messages({
    //     'any.invalid': 'Number of questions must be a number (string)',
    //     'number.min': 'Number of questions must be greater than or equal to 0'
    //   })
    //   .custom((value, helpers) => {
    //     if (!value) {
    //       return value
    //     }
    //     numericStringMinZeroValidator(value, helpers)
    //   })
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
export default createSessionValidation
