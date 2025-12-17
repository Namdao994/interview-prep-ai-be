import togglePinQuestionController from '@controllers/question/toggle-pin-question'
import authenticateMiddleware from '@middlewares/authenticate'
import togglePinQuestionValidation from '@validations/question/toggle-pin-question'
import { Router } from 'express'

const router = Router()

router.patch(
  '/:id/toggle-pin-question',
  authenticateMiddleware,
  togglePinQuestionValidation,
  togglePinQuestionController
)
export default router
