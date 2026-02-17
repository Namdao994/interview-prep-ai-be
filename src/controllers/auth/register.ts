import type { NextFunction, Request, Response } from 'express'
import type { IUser } from '@interfaces/user'
import registerService from '@services/auth/register'
import { StatusCodes } from 'http-status-codes'

type UserData = {
  email: IUser['email']['value']
  name: IUser['profile']['name']
  password: NonNullable<IUser['password']>
}
const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, name, password } = req.body as UserData
    const profileImageFile = req.file
    const pickedUser = await registerService(
      name,
      email,
      password,
      profileImageFile
    )

    res.status(StatusCodes.CREATED).json({
      message: 'Register successfully',
      data: pickedUser
    })
  } catch (error) {
    next(error)
  }
}

export default registerController
