import addDiscussionQuestionController from '@controllers/ai/add-discussion-question'
import generateExplanationController from '@controllers/ai/generate-explanation'
import generateQuestionController from '@controllers/ai/generate-questions'
import authenticateMiddleware from '@middlewares/authenticate'
import authenticateSSE from '@middlewares/authenticateSSE'
import { Router } from 'express'

const router = Router()

router.get(
  '/generate-questions/:sessionId',
  authenticateSSE,
  generateQuestionController
)

router.post(
  '/generate-explanation/:sessionId/question/:questionId',
  authenticateMiddleware,
  generateExplanationController
)

router.post(
  '/generate-answer-follow-up-question/:sessionId/question/:questionId',
  authenticateMiddleware,
  addDiscussionQuestionController
)

export default router
