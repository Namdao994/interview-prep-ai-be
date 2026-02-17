import updateUserService from '@services/user/update-user'
import type { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import type { IUser } from '@interfaces/user'
type UserData = {
  name: IUser['profile']['name']
}
const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.jwtVerified
    const { name } = req.body as UserData
    const pickedUser = await updateUserService(userId, name)

    res.status(StatusCodes.OK).json({
      message: 'User updated successfully',
      data: pickedUser
    })
  } catch (error) {
    next(error)
  }
}

export default updateUserController
