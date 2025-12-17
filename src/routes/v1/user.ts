import getAllUserController from '@controllers/user/get-all-user'
import getUserByIdController from '@controllers/user/get-user-by-id'
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

router.get('/my-profile', authenticateMiddleware, getUserByIdController)

export default router
