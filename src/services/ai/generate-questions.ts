import env from '@configs/env'
import ApiError from '@utils/api-error'
import { questionAnswerPrompt } from '@utils/prompt-ai'
import { StatusCodes } from 'http-status-codes'
import { Types } from 'mongoose'
import OpenAI from 'openai'
import type { IAnswer } from '@interfaces/question'
interface IQnA {
  _id: Types.ObjectId
  question: string
  answer: IAnswer
}
const client = new OpenAI({
  apiKey: env.POE_API_KEY,
  baseURL: env.BASE_URL_POE_AI_API
})
const QA_START = '<QA_START>'
const QA_END = '<QA_END>'
const generateQuestionService = async function* (
  role: string,
  experience: string,
  topicsToFocus: string,
  numberOfQuestions: string
) {
  const prompt = questionAnswerPrompt(
    role,
    experience,
    topicsToFocus,
    numberOfQuestions
  )
  const stream = await client.chat.completions.create({
    model: 'gpt-5-mini',
    messages: [{ role: 'user', content: prompt }],
    stream: true
  })
  try {
    let buffer = ''
    for await (const chunk of stream) {
      if (chunk.choices[0].finish_reason) {
        return stream.controller.abort()
      }

      buffer += chunk.choices[0].delta.content || ''

      while (buffer.includes(QA_START) && buffer.includes(QA_END)) {
        const start = buffer.indexOf(QA_START) + QA_START.length
        const end = buffer.indexOf(QA_END)

        const jsonString = buffer.slice(start, end).trim()
        buffer = buffer.slice(end + QA_END.length)

        const qaObj = JSON.parse(jsonString)

        yield {
          ...qaObj,
          _id: new Types.ObjectId().toString()
        } as IQnA
      }
    }
  } catch (error) {
    throw new ApiError(StatusCodes.CONFLICT, 'Something went wrong')
  } finally {
    stream.controller.abort()
  }
}

export default generateQuestionService
