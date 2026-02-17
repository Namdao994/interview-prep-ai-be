import Question from '@models/Question'
import ApiError from '@utils/api-error'
import { StatusCodes } from 'http-status-codes'
import type { IDiscussion } from '@interfaces/question'

const addDiscussionToQuestionService = async (
  sessionId: string,
  questionId: string,
  discussion: IDiscussion
): Promise<IDiscussion> => {
  const updatedQuestion = await Question.findOneAndUpdate(
    {
      _id: questionId,
      sessionId
    },
    {
      $push: {
        discussion
      }
    },
    {
      new: true,
      runValidators: true
    }
  ).exec()

  if (!updatedQuestion) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Question not found')
  }

  return discussion
}

export default addDiscussionToQuestionService
