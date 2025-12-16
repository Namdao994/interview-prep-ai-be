import env from '@configs/env'
import ApiError from '@utils/api-error'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
const errorHandlingMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let error: ApiError
  if (err instanceof ApiError) {
    error = err
  } else if (err instanceof Error) {
    error = new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, err.message)
  } else {
    error = new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Unknown error')
  }
  const status = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR

  res.status(status).json({
    success: false,
    message: error.message,
    // Xóa stack nếu không phải dev
    ...(env.NODE_ENV === 'dev' && { stack: error.stack })
  })
}

export default errorHandlingMiddleware
