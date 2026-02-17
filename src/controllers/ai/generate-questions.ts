import { createSession } from 'better-sse'
import type { Request, Response } from 'express'
import generateQuestionService from '@services/ai/generate-questions'
import createQuestionService from '@services/question/create-question'
import getSessionByIdService from '@services/session/get-session-by-id'
const NUMBER_OF_QUESTIONS = 5
const generateQuestionController = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.jwtVerified
    const sessionId = req.params.sessionId
    const session = await getSessionByIdService(sessionId, userId)

    const questionGenerator = generateQuestionService(
      session.targetRole,
      String(session.experience),
      session.topicsToFocus,
      String(NUMBER_OF_QUESTIONS)
    )
    const sessionSSE = await createSession(req, res)

    // hai chức năng, một là hết thì tự ngắt, hai là người dùng thích ngắt lúc nào thì ngắt
    sessionSSE.on('disconnected', async () => {
      console.log('đã dis')
      questionGenerator.return?.()
    })

    for await (const qna of questionGenerator) {
      if (!sessionSSE.isConnected) {
        await questionGenerator.return?.()
        break
      }
      //save question to database
      const pickedQuestion = await createQuestionService(qna, sessionId)
      // tránh push khi đã disconnect
      if (sessionSSE.isConnected) {
        sessionSSE.push(pickedQuestion, 'QNA_CREATED')
      }
    }
    // sau khi generate hết question thì ngắt kết nối sse
    // CHỈ gửi DONE nếu còn kết nối
    if (sessionSSE.isConnected) {
      sessionSSE.push('', 'DONE')
    }
  } catch (error) {
    // ❗ SSE: không next(error)
    console.error('SSE error:', error)
    if (!res.writableEnded) {
      res.end()
    }
  }
}

export default generateQuestionController
