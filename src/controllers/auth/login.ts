import loginService from '@services/auth/login'
import type { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import crypto from 'crypto'
import type { IUser } from '@interfaces/user'
type UserData = {
  email: IUser['email']['value']
  password: NonNullable<IUser['password']>
}
const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body as UserData
    const { accessToken, refreshToken, pickedUser } = await loginService(
      email,
      password
    )
    const csrfToken = crypto.randomBytes(32).toString('hex')

    res.status(StatusCodes.OK).json({
      message: 'Login successfully',
      data: {
        user: pickedUser,
        accessToken,
        refreshToken,
        csrfToken
      }
    })
  } catch (error) {
    next(error)
  }
}

export default loginController
