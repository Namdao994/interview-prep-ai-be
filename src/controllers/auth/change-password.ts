import changePasswordService from '@services/auth/change-password'
import type { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
type UserData = {
  password: string
  newPassword: string
}
const changePasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.jwtVerified
    const { password, newPassword } = req.body as UserData
    console.log(password, newPassword)
    await changePasswordService(userId, password, newPassword)
    res.status(StatusCodes.OK).json({
      message: 'Password changed successfully'
    })
  } catch (error) {
    next(error)
  }
}

export default changePasswordController
