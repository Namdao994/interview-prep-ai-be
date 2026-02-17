import verifyEmailOtpService from '@services/auth/verify-email-otp'
import type { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
type VerifyOtpPayload = {
  email: string
  code: string
}
const verifyEmailOtpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, code } = req.body as VerifyOtpPayload
    await verifyEmailOtpService(email, code)
    res.status(StatusCodes.OK).json({ message: 'Email verified successfully' })
  } catch (error) {
    next(error)
  }
}

export default verifyEmailOtpController
