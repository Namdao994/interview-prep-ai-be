import getUserByIdService from '@services/user/get-user-by-id'
import { Response, Request, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
const getUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.jwtVerified
    const pickedUser = await getUserByIdService(userId)
    return res.status(StatusCodes.OK).json({
      user: pickedUser
    })
  } catch (error) {
    next()
  }
}

export default getUserByIdController
