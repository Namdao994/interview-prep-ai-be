import generateAnswerFollowUpService from '@services/ai/generate-answer-follow-up'
import addDiscussionToQuestionService from '@services/question/add-discussion-to-question'
import getQuestionByIdService from '@services/question/get-question-by-id'
import getSessionByIdService from '@services/session/get-session-by-id'
import type { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import type { IDiscussion } from '@interfaces/question'
const addDiscussionQuestionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.jwtVerified
    const { questionId, sessionId } = req.params
    const userDiscussion = req.body as IDiscussion
    console.log('userDiscussion', userDiscussion)
    console.log('questionId', questionId)
    console.log('sessionId', sessionId)

    const pickedSession = await getSessionByIdService(sessionId, userId)

    const pickedQuestion = await getQuestionByIdService(
      questionId,
      pickedSession.id
    )
    await addDiscussionToQuestionService(
      pickedSession.id,
      pickedQuestion.id,
      userDiscussion
    )

    const explanation = await generateAnswerFollowUpService(
      pickedQuestion.question,
      pickedQuestion.answer,
      userDiscussion.blocks[0].content
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

export default addDiscussionQuestionController
