import env from '@configs/env'
import loginService from '@services/auth/login'
import type { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import ms from 'ms'
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
    res.cookie('accessToken', accessToken, {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
      maxAge: ms(env.ACCESS_TOKEN_COOKIE)
    })
    res.cookie('refreshToken', refreshToken, {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
      maxAge: ms(env.REFRESH_TOKEN_COOKIE)
    })
    res.cookie('csrfToken', csrfToken, {
      httpOnly: false,
      secure: env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: ms(env.CSRF_TOKEN_COOKIE)
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
