import env from '@configs/env'
import { PickedUser } from '@utils/pickers'
import type { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
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
      return res.redirect(`${env.FRONTEND_URL}/login?error=oauth_cancelled`)
    }
    const { accessToken, refreshToken, pickedUser } = req.user as PickedProfile

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms(env.ACCESS_TOKEN_LIFETIME)
    })
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms(env.REFRESH_TOKEN_LIFETIME)
    })

    res.status(StatusCodes.OK).json({
      user: pickedUser
    })
  } catch (error) {
    next(error)
  }
}

export default oauth20LoginController
