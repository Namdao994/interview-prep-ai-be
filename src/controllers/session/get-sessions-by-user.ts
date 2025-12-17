import getSessionsByUserService from '@services/session/get-sessions-by-user'
import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

const getSessionsByUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.jwtVerified
    const limitQuery = req.query.limit as string
    const offsetQuery = req.query.offset as string

    const { limit, offset, sessions, totalSession } =
      await getSessionsByUserService(limitQuery, offsetQuery, userId)

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

export default getSessionsByUserController
