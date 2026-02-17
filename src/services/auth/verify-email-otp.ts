import User from '@models/User'
import ApiError from '@utils/api-error'
import { StatusCodes } from 'http-status-codes'
import crypto from 'crypto'
const verifyEmailOtpService = async (email: string, code: string) => {
  const user = await User.findOne({ 'email.value': email })

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
  }

  if (user.email.verified) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Email already verified')
  }

  if (!user.emailOtpHash || !user.emailOtpExpiredAt) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'OTP not found')
  }

  if (user.emailOtpExpiredAt < new Date()) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'OTP expired')
  }
  const otpHashed = crypto.createHash('sha256').update(code).digest('hex')
  const isValid = otpHashed === user.emailOtpHash
  if (!isValid) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid OTP')
  }

  user.email.verified = true
  user.emailOtpHash = null
  user.emailOtpExpiredAt = null

  await user.save()
}

export default verifyEmailOtpService
