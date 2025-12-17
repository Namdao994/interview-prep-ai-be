import createSessionController from '@controllers/session/create-session'
import getAllSessionController from '@controllers/session/get-all-session'
import getSessionsByUserController from '@controllers/session/get-sessions-by-user'
import authenticateMiddleware from '@middlewares/authenticate'
import authorizeMiddleware from '@middlewares/authorize'
import createSessionValidation from '@validations/session/create-session'
import { Router } from 'express'

const router = Router()

router.get(
  '/get-all-session',
  authenticateMiddleware,
  authorizeMiddleware(['get_all_session']),
  getAllSessionController
)

router.get('/my-session', authenticateMiddleware, getSessionsByUserController)

router.post(
  '/create-session',
  authenticateMiddleware,
  createSessionValidation,
  createSessionController
)

export default router
