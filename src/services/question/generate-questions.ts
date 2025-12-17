import env from '@configs/env'
import Question, { IQuestion } from '@models/Question'
import ApiError from '@utils/api-error'
import { PickedQuestion, pickQuestion } from '@utils/pickers'
import { questionAnswerPrompt } from '@utils/prompt-ai'
import { StatusCodes } from 'http-status-codes'
import OpenAI from 'openai'
const client = new OpenAI({
  apiKey: env.POE_API_KEY,
  baseURL: env.BASE_URL_POE_AI_API
})
const generateQuestionService = async (
  role: string,
  experience: string,
  topicsToFocus: string,
  numberOfQuestions: string,
  sessionId: string
): Promise<PickedQuestion[]> => {
  const prompt = questionAnswerPrompt(
    role,
    experience,
    topicsToFocus,
    numberOfQuestions || env.DEFAULT_NUMBER_QUESTIONS_GENERATION
  )

  const response = await client.chat.completions.create({
    model: 'gpt-5-mini',
    messages: [{ role: 'user', content: prompt }]
  })

  let rawText = response.choices[0].message.content

  if (!rawText) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Something went wrong'
    )
  }

  if (!Array.isArray(JSON.parse(rawText))) {
    throw new ApiError(StatusCodes.CONFLICT, 'Something went wrong')
  }

  const questionsFormAI = JSON.parse(rawText) as Pick<
    IQuestion,
    'question' | 'answer'
  >[]

  const questions = await Promise.all(
    questionsFormAI.map(async (item): Promise<PickedQuestion> => {
      const question = await Question.create({
        question: item.question,
        answer: item.answer,
        sessionId
      })
      return pickQuestion(question)
    })
  )
  return questions
}

export default generateQuestionService
