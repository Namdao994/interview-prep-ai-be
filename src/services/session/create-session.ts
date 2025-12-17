import Session, { ISession } from '@models/Session'
import generateQuestionService from '@services/question/generate-questions'
import { PickedSession, pickSession } from '@utils/pickers'

export type SessionBody = {
  targetRole: ISession['targetRole']
  experience: ISession['experience']
  topicsToFocus: ISession['topicsToFocus']
  description: ISession['description']
  numberOfQuestions: string
}
const createSessionService = async (
  sessionBody: SessionBody,
  userId: string
): Promise<PickedSession> => {
  const {
    targetRole,
    topicsToFocus,
    experience,
    description,
    numberOfQuestions
  } = sessionBody
  const createdSession = await Session.create({
    userId,
    targetRole,
    topicsToFocus,
    experience,
    description
  })
  const createdSessionId = createdSession._id.toString()

  const questions = await generateQuestionService(
    targetRole,
    experience,
    topicsToFocus,
    numberOfQuestions,
    createdSessionId
  )
  const questionsId = questions.map((item) => item._id)
  createdSession.questions = questionsId
  await createdSession.save()
  const session = await Session.findById(createdSessionId)
    .populate({
      path: 'questions',
      select: '-sessionId -__v',
      options: { sort: { createdAt: -1 } }
    })
    .lean()
    .exec()
  return pickSession(session!)
}

export default createSessionService
