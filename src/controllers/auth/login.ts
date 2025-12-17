import env from '@configs/env'
import { IUser } from '@models/User'
import loginService from '@services/auth/login'
import type { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import ms from 'ms'
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
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: ms(env.ACCESS_TOKEN_LIFETIME)
    })
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: ms(env.REFRESH_TOKEN_LIFETIME)
    })
    res.status(StatusCodes.OK).json({
      message: 'Login successfully',
      data: pickedUser
    })
  } catch (error) {
    next(error)
  }
}

export default loginController
