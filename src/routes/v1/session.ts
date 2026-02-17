import deleteQuestionController from '@controllers/question/delete-question'
import togglePinQuestionController from '@controllers/question/toggle-pin-question'
import archiveSessionController from '@controllers/session/archive-session'
import createSessionController from '@controllers/session/create-session'
import deleteSessionController from '@controllers/session/delete-session'
import getAllSessionController from '@controllers/session/get-all-session'
import getRecentSessionsSearchSuggestionsController from '@controllers/session/get-recent-sessions-search-suggestions'
import getSessionByIdController from '@controllers/session/get-session-by-id'
import getSessionsByUserController from '@controllers/session/get-sessions-by-user'
import unarchiveSessionController from '@controllers/session/unarchive-session'
import updateSessionController from '@controllers/session/update-session'
import deleteQuestionValidation from '@validations/question/delete-question'
import togglePinQuestionValidation from '@validations/question/toggle-pin-question'
import createSessionValidation from '@validations/session/create-session'
import deleteSessionValidation from '@validations/session/delete-session'
import getAllSessionValidation from '@validations/session/get-all-session'
import getSessionByIdValidation from '@validations/session/get-session-by-id'
import getSessionsByUserValidation from '@validations/session/get-sessions-by-user'
import updateSessionValidation from '@validations/session/update-session'
import { Router } from 'express'

const router = Router()

router.get(
  '/get-all-session',
  // authorizeMiddleware(['get_all_session']),
  getAllSessionValidation,
  getAllSessionController
)

router.get(
  '/my-sessions',
  getSessionsByUserValidation,
  getSessionsByUserController
)

router.get(
  '/search-sessions-suggestions',
  getRecentSessionsSearchSuggestionsController
)

router.get(
  '/my-session/:id',
  getSessionByIdValidation,
  getSessionByIdController
)

router.patch(
  '/my-session/:id',
  updateSessionValidation,
  updateSessionController
)

router.patch(
  '/my-session/:id/archive',
  updateSessionValidation,
  archiveSessionController
)

router.patch(
  '/my-session/:id/unarchive',
  updateSessionValidation,
  unarchiveSessionController
)

router.patch(
  '/:sessionId/question/:questionId/toggle-pin',
  togglePinQuestionValidation,
  togglePinQuestionController
)

router.post('/create-session', createSessionValidation, createSessionController)

router.delete(
  '/my-session/:id',
  deleteSessionValidation,
  deleteSessionController
)

router.delete(
  '/:sessionId/question/:questionId',
  deleteQuestionValidation,
  deleteQuestionController
)

export default router
