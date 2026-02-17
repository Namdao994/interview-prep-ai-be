import getRecentSessionsSearchSuggestionsService from '@services/session/get-recent-sessions-search-suggestions'
import type { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
const getRecentSessionsSearchSuggestionsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.jwtVerified
    const recentSessionsSuggestions =
      await getRecentSessionsSearchSuggestionsService(userId)
    res.status(StatusCodes.OK).json({
      message: '',
      data: recentSessionsSuggestions
    })
  } catch (error) {
    next(error)
  }
}

export default getRecentSessionsSearchSuggestionsController
