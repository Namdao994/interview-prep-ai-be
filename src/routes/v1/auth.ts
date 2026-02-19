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
import csrfMiddleware from '@middlewares/csrf'
import uploadImageMiddleware from '@middlewares/upload-image'
import changePasswordController from '@controllers/auth/change-password'
import changePasswordValidation from '@validations/auth/change-password'
import rotateCsrfTokenController from '@controllers/auth/rotate-csrf-token'
import verifyEmailOtpValidation from '@validations/auth/verify-email-otp'
import verifyEmailOtpController from '@controllers/auth/verify-email-otp'
import getUserByIdController from '@controllers/user/get-user-by-id'

const router = Router()

router.post(
  '/register',
  uploadImageMiddleware.single('profileImageFile'),
  registerValidation,
  registerController
)
router.post('/login', loginValidation, loginController)
router.delete(
  '/logout',
  authenticateMiddleware,
  csrfMiddleware,
  logoutController
)
router.post('/refresh-token', refreshTokenController)
router.post('/rotate-csrf', rotateCsrfTokenController)

router.post(
  '/verify-email-otp',
  verifyEmailOtpValidation,
  verifyEmailOtpController
)

router.patch(
  '/change-password',
  authenticateMiddleware,
  csrfMiddleware,
  changePasswordValidation,
  changePasswordController
)

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
router.get('/my-profile', getUserByIdController)

export default router
