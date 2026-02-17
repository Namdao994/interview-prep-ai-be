import Question from '@models/Question'
import ApiError from '@utils/api-error'
import { StatusCodes } from 'http-status-codes'

const deleteQuestionService = async (questionId: string, sessionId: string) => {
  const deletedQuestion = await Question.findOneAndDelete({
    _id: questionId,
    sessionId
  })
    .lean()
    .exec()
  if (!deletedQuestion) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Question not found')
  }
}

export default deleteQuestionService
