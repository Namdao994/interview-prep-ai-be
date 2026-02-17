import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
const logoutController = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie('refreshToken')
    res.clearCookie('accessToken')
    res.clearCookie('csrfToken')

    res.status(StatusCodes.OK).json({ message: 'Logout successfully' })
  } catch (error) {
    next(error)
  }
}

export default logoutController
