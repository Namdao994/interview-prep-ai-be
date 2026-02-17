import { Router } from 'express'
import authRoutes from '@routes/v1/auth'
import userRoutes from '@routes/v1/user'
import sessionRoutes from '@routes/v1/session'
import questionRoutes from '@routes/v1/question'
import aiRoutes from '@routes/v1/ai'
import authenticateMiddleware from '@middlewares/authenticate'
import { StatusCodes } from 'http-status-codes'
import csrfMiddleware from '@middlewares/csrf'
const router = Router()

router.get('/', (_, res) => {
  res.status(StatusCodes.OK).json({
    message: 'API is live',
    status: 'ok',
    version: '1.0.0',
    // docs: '',
    timestamp: new Date().toISOString()
  })
})

router.use('/auth', authRoutes)
router.use('/user', authenticateMiddleware, csrfMiddleware, userRoutes)
router.use('/session', authenticateMiddleware, csrfMiddleware, sessionRoutes)
router.use('/question', authenticateMiddleware, csrfMiddleware, questionRoutes)
router.use('/ai', authenticateMiddleware, csrfMiddleware, aiRoutes)

export default router
