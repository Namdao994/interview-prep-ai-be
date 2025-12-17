import togglePinQuestionService, {
  QuestionBody
} from '@services/question/toggle-pin-question'
import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
const togglePinQuestionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { isPinned } = req.body as QuestionBody
    const questionId = req.params.id
    const pickedQuestion = await togglePinQuestionService(questionId, isPinned)
    res.status(StatusCodes.OK).json({
      message: 'Pinned question',
      data: pickedQuestion
    })
  } catch (error) {
    next(error)
  }
}

export default togglePinQuestionController
