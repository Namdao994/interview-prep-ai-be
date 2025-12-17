import createSessionController from '@controllers/session/create-session'
import deleteSessionController from '@controllers/session/delete-session'
import getAllSessionController from '@controllers/session/get-all-session'
import getSessionByIdController from '@controllers/session/get-session-by-id'
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

router.get('/my-sessions', authenticateMiddleware, getSessionsByUserController)

router.get('/my-session/:id', authenticateMiddleware, getSessionByIdController)

router.post(
  '/create-session',
  authenticateMiddleware,
  createSessionValidation,
  createSessionController
)

router.delete(
  '/delete-session/:id',
  authenticateMiddleware,
  deleteSessionController
)

export default router
