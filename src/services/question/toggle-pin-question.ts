import Question from '@models/Question'
import ApiError from '@utils/api-error'
import { pickQuestion } from '@utils/pickers'
import { StatusCodes } from 'http-status-codes'
import type { IQuestion, PickedQuestion } from '@interfaces/question'

export type QuestionBody = Pick<IQuestion, 'isPinned'>
const togglePinQuestionService = async (
  sessionId: string,
  questionId: string,
  isPinned: boolean
): Promise<PickedQuestion> => {
  const updatedQuestion = await Question.findOneAndUpdate(
    {
      _id: questionId,
      sessionId: sessionId
    },
    {
      $set: { isPinned }
    },
    {
      new: true,
      runValidators: true
    }
  ).exec()

  if (!updatedQuestion) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Question not found')
  }
  return pickQuestion(updatedQuestion.toObject())
}

export default togglePinQuestionService
