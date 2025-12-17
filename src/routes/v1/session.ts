import createSessionController from '@controllers/session/create-session'
import deleteSessionController from '@controllers/session/delete-session'
import getAllSessionController from '@controllers/session/get-all-session'
import getSessionByIdController from '@controllers/session/get-session-by-id'
import getSessionsByUserController from '@controllers/session/get-sessions-by-user'
import authenticateMiddleware from '@middlewares/authenticate'
import authorizeMiddleware from '@middlewares/authorize'
import createSessionValidation from '@validations/session/create-session'
import deleteSessionValidation from '@validations/session/delete-session'
import getAllSessionValidation from '@validations/session/get-all-session'
import getSessionByIdValidation from '@validations/session/get-session-by-id'
import getSessionsByUser from '@validations/session/get-sessions-by-user'
import { Router } from 'express'

const router = Router()

router.get(
  '/get-all-session',
  authenticateMiddleware,
  authorizeMiddleware(['get_all_session']),
  getAllSessionValidation,
  getAllSessionController
)

router.get(
  '/my-sessions',
  authenticateMiddleware,
  getSessionsByUser,
  getSessionsByUserController
)

router.get(
  '/my-session/:id',
  authenticateMiddleware,
  getSessionByIdValidation,
  getSessionByIdController
)

router.post(
  '/create-session',
  authenticateMiddleware,
  createSessionValidation,
  createSessionController
)

router.delete(
  '/delete-session/:id',
  authenticateMiddleware,
  deleteSessionValidation,
  deleteSessionController
)

export default router
