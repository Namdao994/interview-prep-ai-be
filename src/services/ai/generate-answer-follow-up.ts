import { generateAnswerFollowUpPrompt } from '@utils/prompt-ai'
import type { IAnswer, IDiscussionBlock } from '@interfaces/question'
import OpenAI from 'openai'
import env from '@configs/env'
import ApiError from '@utils/api-error'
import { StatusCodes } from 'http-status-codes'

const client = new OpenAI({
  apiKey: env.POE_API_KEY,
  baseURL: env.BASE_URL_POE_AI_API
})

const generateAnswerFollowUpService = async (
  question: string,
  answer: IAnswer,
  userQuestion: string,
  role?: string,
  experience?: number
) => {
  try {
    const prompt = generateAnswerFollowUpPrompt(
      question,
      JSON.stringify(answer),
      userQuestion,
      role,
      experience
    )

    const completion = await client.chat.completions.create({
      model: 'gpt-5-mini',
      messages: [{ role: 'user', content: prompt }],
      stream: false
    })

    const content = completion.choices?.[0]?.message?.content

    if (!content) {
      throw new ApiError(StatusCodes.CONFLICT, 'AI did not return any content')
    }

    const normalizationContent = content
      .replace(/<FOLLOW_UP_START>\s*/i, '')
      .replace(/\s*<FOLLOW_UP_END>/i, '')
      .trim()

    return JSON.parse(normalizationContent).blocks as IDiscussionBlock[]
  } catch (error) {
    throw new ApiError(StatusCodes.CONFLICT, 'Something went wrong')
  }
}

export default generateAnswerFollowUpService
