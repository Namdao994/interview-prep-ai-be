import loginController from '@controllers/auth/login'
import logoutController from '@controllers/auth/logout'
import refreshTokenController from '@controllers/auth/refresh-token'
import registerController from '@controllers/auth/register'
import authenticateMiddleware from '@middlewares/authenticate'
import loginValidation from '@validations/auth/login'
import registerValidation from '@validations/auth/register'
import passport from '@configs/configed-passport'
import { Router } from 'express'
import oauth20LoginController from '@controllers/auth/oauth-20-login'

const router = Router()

router.post('/register', registerValidation, registerController)
router.post('/login', loginValidation, loginController)
router.delete('/logout', authenticateMiddleware, logoutController)
router.get('/refresh-token', refreshTokenController)

router.get('/login/google', passport.authenticate('google'))

router.get(
  '/oauth2/redirect/google',
  passport.authenticate('google', { session: false }),
  oauth20LoginController
)

router.get('/login/github', passport.authenticate('github'))

router.get(
  '/oauth2/redirect/github',
  passport.authenticate('github', { session: false }),
  oauth20LoginController
)

router.get('/login/discord', passport.authenticate('discord'))

router.get(
  '/oauth2/redirect/discord',
  passport.authenticate('discord', { session: false }),
  oauth20LoginController
)

export default router
