import { DEFAULT_ERROR_CODE, ErrorCodeType } from '@constants/error-codes'

class ApiError extends Error {
  public statusCode: number
  public errorCode: ErrorCodeType

  constructor(
    statusCode: number,
    message: string,
    errorCode: ErrorCodeType = DEFAULT_ERROR_CODE
  ) {
    super(message)

    this.statusCode = statusCode
    this.errorCode = errorCode
    this.name = 'ApiError'

    Error.captureStackTrace(this, this.constructor)
  }
}

export default ApiError
