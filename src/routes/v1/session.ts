import getAllSessionController from '@controllers/session/get-all-session'
import authenticateMiddleware from '@middlewares/authenticate'
import authorizeMiddleware from '@middlewares/authorize'
import { Router } from 'express'

const router = Router()

router.get(
  '/',
  authenticateMiddleware,
  authorizeMiddleware(['get_all_session']),
  getAllSessionController
)

export default router
