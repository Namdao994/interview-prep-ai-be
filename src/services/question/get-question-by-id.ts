import Question from '@models/Question'
import ApiError from '@utils/api-error'
import { pickQuestion } from '@utils/pickers'
import { StatusCodes } from 'http-status-codes'

const getQuestionByIdService = async (
  questionId: string,
  sessionId: string
) => {
  const question = await Question.findOne({
    _id: questionId,
    sessionId
  })
    .select('-__v')
    .lean()
    .exec()

  if (!question) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Question not found')
  }
  return pickQuestion(question)
}

export default getQuestionByIdService
