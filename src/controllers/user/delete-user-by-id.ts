import deleteUserByIdService from '@services/user/delete-user-by-id'
import { Response, Request, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
const deleteUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id
    await deleteUserByIdService(userId)
    res.status(StatusCodes.NO_CONTENT).json({
      message: 'User deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}

export default deleteUserByIdController
