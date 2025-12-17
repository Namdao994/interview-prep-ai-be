import deleteSessionService from '@services/session/delete-session'
import { Response, Request, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
const deleteSessionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionId = req.params.id
    const { id: userId } = req.jwtVerified
    await deleteSessionService(sessionId, userId)

    res.status(StatusCodes.OK).json({
      message: 'Session deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}

export default deleteSessionController
