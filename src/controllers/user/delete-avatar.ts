import deleteAvatarService from '@services/user/delete-avatar'
import type { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
const deleteAvatarController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.jwtVerified
    await deleteAvatarService(userId)
    res.status(StatusCodes.OK).json({
      message: 'Avatar was deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}

export default deleteAvatarController
