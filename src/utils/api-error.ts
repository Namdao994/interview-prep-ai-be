class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message)
    this.name = 'Api Error'
    Error.captureStackTrace(this, this.constructor)
  }
}

export default ApiError
