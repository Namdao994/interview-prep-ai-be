import generateExplanationService from '@services/ai/generate-explanation'
import addDiscussionToQuestionService from '@services/question/add-discussion-to-question'
import getQuestionByIdService from '@services/question/get-question-by-id'
import getSessionByIdService from '@services/session/get-session-by-id'
import type { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

const generateExplanationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.jwtVerified
    const { questionId, sessionId } = req.params
    console.log('questionId', questionId)
    console.log('sessionId', sessionId)
    const pickedSession = await getSessionByIdService(sessionId, userId)

    const pickedQuestion = await getQuestionByIdService(
      questionId,
      pickedSession.id
    )

    const explanation = await generateExplanationService(
      pickedQuestion.question,
      pickedQuestion.answer
    )

    const discussion = {
      role: 'assistant' as const,
      blocks: explanation,
      createdAt: new Date()
    }

    await addDiscussionToQuestionService(
      pickedSession.id,
      pickedQuestion.id,
      discussion
    )

    res.status(StatusCodes.OK).json({
      message: '',
      data: discussion
    })
  } catch (error) {
    next(error)
  }
}

export default generateExplanationController
