import env from '@configs/env'
import { PickedUser } from '@utils/pickers'
import type { Request, Response, NextFunction } from 'express'
import crypto from 'crypto'
import ms from 'ms'

type PickedProfile = {
  accessToken: string
  refreshToken: string
  pickedUser: PickedUser
}

const oauth20LoginController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.query.error === 'access_denied') {
      return res.redirect(`${env.WEBSITE_DOMAIN}/login?error=oauth_cancelled`)
    }
    const { refreshToken, accessToken } = req.user as PickedProfile
    const csrfToken = crypto.randomBytes(32).toString('hex')
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms(env.ACCESS_TOKEN_COOKIE)
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms(env.REFRESH_TOKEN_COOKIE)
    })
    res.cookie('csrfToken', csrfToken, {
      httpOnly: false,
      secure: env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: ms(env.CSRF_TOKEN_COOKIE)
    })

    res.redirect(`${env.WEBSITE_DOMAIN}/auth/login`)
  } catch (error) {
    next(error)
  }
}

export default oauth20LoginController
