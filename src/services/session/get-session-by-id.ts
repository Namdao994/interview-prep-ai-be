import Question from '@models/Question'
import Session from '@models/Session'
import ApiError from '@utils/api-error'
import { pickQuestion, pickSession } from '@utils/pickers'
import { StatusCodes } from 'http-status-codes'

const getSessionByIdService = async (sessionId: string, userId: string) => {
  const session = await Session.findOne({
    _id: sessionId,
    userId
  })
    .select('-__v')
    .lean()
    .exec()

  if (!session) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Session not found')
  }

  const questions = await Question.find({
    sessionId: session._id
  })
    .sort({ isPinned: -1 })
    .lean()
    .exec()

  return pickSession({
    ...session,
    questions: questions.map((question) => pickQuestion(question))
  })
}

export default getSessionByIdService
