import Question, { IQuestion } from '@models/Question'
import ApiError from '@utils/api-error'
import { PickedQuestion, pickQuestion } from '@utils/pickers'
import { StatusCodes } from 'http-status-codes'

export type QuestionBody = Pick<IQuestion, 'isPinned'>
const togglePinQuestionService = async (
  questionId: string,
  isPinned: boolean
): Promise<PickedQuestion> => {
  const updatedQuestion = await Question.findByIdAndUpdate(
    questionId,
    {
      $set: {
        isPinned
      }
    },
    { new: true, runValidators: true }
  ).exec()

  if (!updatedQuestion) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Question not found')
  }
  return pickQuestion(updatedQuestion.toObject())
}

export default togglePinQuestionService
