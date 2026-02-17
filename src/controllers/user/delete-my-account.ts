import deleteMyAccountService from '@services/auth/delete-my-account'
import type { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
type BodyData = {
  confirmationText: string
}
const deleteMyAccountController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.jwtVerified
    const { confirmationText } = req.body as BodyData
    await deleteMyAccountService(userId, confirmationText)
    res.status(StatusCodes.OK).json({
      message: 'Logout successfully'
    })
  } catch (error) {
    next(error)
  }
}

export default deleteMyAccountController
