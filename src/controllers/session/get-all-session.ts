import getAllSessionService from '@services/session/get-all-session'
import { Response, Request, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

const getAllSessionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const limitQuery = req.query.limit as string
    const offsetQuery = req.query.offset as string
    const { limit, offset, totalSession, sessions } =
      await getAllSessionService(limitQuery, offsetQuery)
    res.status(StatusCodes.OK).json({
      message: 'Get all sessions successfully',
      pagination: {
        limit,
        offset,
        total: totalSession
      },
      data: sessions
    })
  } catch (error) {
    next(error)
  }
}

export default getAllSessionController
