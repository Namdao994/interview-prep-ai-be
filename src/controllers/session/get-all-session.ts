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
    const keywordQuery = req.query.keyword as string
    const statusQuery = req.query.status as string
    const { limit, page, totalSession, sessionsWithCountQuestion } =
      await getAllSessionService(
        limitQuery,
        offsetQuery,
        keywordQuery,
        statusQuery
      )
    res.status(StatusCodes.OK).json({
      message: 'Get all sessions successfully',
      pagination: {
        limit,
        page,
        total: totalSession
      },
      data: sessionsWithCountQuestion
    })
  } catch (error) {
    next(error)
  }
}

export default getAllSessionController
