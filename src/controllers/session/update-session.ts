import updateSessionService from '@services/session/update-session'
import { Response, Request, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import type { UpdateSessionDto } from '@interfaces/session'

const updateSessionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionBody = req.body as UpdateSessionDto
    const sessionId = req.params.id
    const pickedSession = await updateSessionService(sessionId, sessionBody)
    res.status(StatusCodes.OK).json({
      message: 'Session updated successfully',
      data: pickedSession
    })
  } catch (error) {
    next(error)
  }
}

export default updateSessionController
