import Question from '@models/Question'
import { pickQuestion } from '@utils/pickers'
import { Types } from 'mongoose'
import type { IAnswer } from '@interfaces/question'

interface IQnA {
  _id: Types.ObjectId
  question: string
  answer: IAnswer
}
const createQuestionService = async (qna: IQnA, sessionId: string) => {
  const createdQuestion = await Question.create({
    _id: qna._id,
    question: qna.question,
    sessionId,
    answer: qna.answer
  })
  return pickQuestion(createdQuestion.toObject())
}

export default createQuestionService
