import changeAvatarService from '@services/user/change-avatar'
import type { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
const changeAvatarController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const profileImageFile = req.file
    const { id: userId } = req.jwtVerified
    const pickedUser = await changeAvatarService(userId, profileImageFile)
    res.status(StatusCodes.OK).json({
      message: 'Avatar was changed successfully',
      data: pickedUser
    })
  } catch (error) {
    next(error)
  }
}

export default changeAvatarController
