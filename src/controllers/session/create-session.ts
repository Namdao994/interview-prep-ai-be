import createSessionService, {
  SessionBody
} from '@services/session/create-session'
import { Response, Request, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

const createSessionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionBody = req.body as SessionBody
    const { id: userId } = req.jwtVerified
    const pickedSession = await createSessionService(sessionBody, userId)
    res.status(StatusCodes.CREATED).json({
      session: pickedSession
    })
  } catch (error) {
    next(error)
  }
}

export default createSessionController
