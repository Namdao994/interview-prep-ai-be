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
    const keywordQuery = req.query.keyword as string
    const limitQuery = req.query.limit as string
    const pageQuery = req.query.page as string
    const statusQuery = req.query.status as string
    const { limit, page, pickedSessions, totalSession } =
      await getSessionsByUserService(
        limitQuery,
        pageQuery,
        keywordQuery,
        statusQuery,
        userId
      )

    res.status(StatusCodes.OK).json({
      message: 'Get all sessions successfully',
      pagination: {
        limit,
        page,
        total: totalSession
      },
      data: pickedSessions
    })
  } catch (error) {
    next(error)
  }
}

export default getSessionsByUserController
