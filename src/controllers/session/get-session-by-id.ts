import getSessionByIdService from '@services/session/get-session-by-id'
import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
const getSessionByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionId = req.params.id
    const { id: userId } = req.jwtVerified

    const pickedSession = await getSessionByIdService(sessionId, userId)

    res.status(StatusCodes.OK).json({
      session: pickedSession
    })
  } catch (error) {
    next(error)
  }
}

export default getSessionByIdController
