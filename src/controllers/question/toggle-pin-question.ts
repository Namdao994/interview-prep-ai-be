import togglePinQuestionService, {
  QuestionBody
} from '@services/question/toggle-pin-question'
import getSessionByIdService from '@services/session/get-session-by-id'
import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
const togglePinQuestionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { isPinned } = req.body as QuestionBody
    const { sessionId, questionId } = req.params
    const { id: userId } = req.jwtVerified
    const pickedSession = await getSessionByIdService(sessionId, userId)
    const pickedQuestion = await togglePinQuestionService(
      pickedSession.id,
      questionId,
      isPinned
    )
    res.status(StatusCodes.OK).json({
      message: 'Pinned question',
      data: pickedQuestion
    })
  } catch (error) {
    next(error)
  }
}

export default togglePinQuestionController
