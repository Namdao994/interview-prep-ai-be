import deleteQuestionService from '@services/question/delete-question'
import getSessionByIdService from '@services/session/get-session-by-id'
import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
const deleteQuestionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.jwtVerified
    const { questionId, sessionId } = req.params
    const pickedSession = await getSessionByIdService(sessionId, userId)
    await deleteQuestionService(questionId, pickedSession.id)
    res.status(StatusCodes.OK).json({
      message: 'Question deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}

export default deleteQuestionController
