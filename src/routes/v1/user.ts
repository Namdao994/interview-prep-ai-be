import getAllUserController from '@controllers/user/get-all-user'
import authenticateMiddleware from '@middlewares/authenticate'
import authorizeMiddleware from '@middlewares/authorize'
import { Router } from 'express'

const router = Router()

router.get(
  '/',
  authenticateMiddleware,
  authorizeMiddleware(['get_all_user']),
  getAllUserController
)

export default router
