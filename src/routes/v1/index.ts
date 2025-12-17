import { Router } from 'express'
import authRoutes from '@routes/v1/auth'
import userRoutes from '@routes/v1/user'
import sessionRoutes from '@routes/v1/session'
import questionRoutes from '@routes/v1/question'
const router = Router()

router.get('/', (_, res) => {
  res.status(200).json({
    message: 'API is live',
    status: 'ok',
    version: '1.0.0',
    // docs: '',
    timestamp: new Date().toISOString()
  })
})

router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/session', sessionRoutes)
router.use('/question', questionRoutes)

export default router
