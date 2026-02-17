import Role from '@models/Role'
import User from '@models/User'
import streamUpload from '@providers/cloudinary/stream-upload'
import { sendVerificationOtpEmail } from '@providers/nodemailer/send-verification-otp-email'
import ApiError from '@utils/api-error'
import { PickedUser, pickUser } from '@utils/pickers'
import bcrypt from 'bcryptjs'
import { StatusCodes } from 'http-status-codes'
import crypto from 'crypto'
import { ErrorCode } from '@constants/error-codes'
const registerService = async (
  name: string,
  email: string,
  password: string,
  profileImageFile?: Express.Multer.File
): Promise<PickedUser> => {
  const otp = crypto.randomInt(100000, 1000000).toString()
  const user = await User.findOne({ 'email.value': email })
    .select('email profile')
    .lean()
    .exec()
  if (user && user.email.verified) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      'This email has already been registered',
      ErrorCode.EMAIL_ALREADY_VERIFIED
    )
  }

  if (user && !user.email.verified) {
    //send email
    await sendVerificationOtpEmail(user.profile.name, user.email.value, otp)

    const otpHashed = crypto.createHash('sha256').update(otp).digest('hex')
    const emailOtpExpiredAt = new Date(Date.now() + 5 * 60 * 1000)
    await User.findByIdAndUpdate(
      user._id,
      {
        emailOtpHash: otpHashed,
        emailOtpExpiredAt
      },
      {
        new: true,
        runValidators: true
      }
    )
    throw new ApiError(
      StatusCodes.CONFLICT,
      'This email has already been registered. Please verify your email',
      ErrorCode.EMAIL_ALREADY_REGISTERED_NOT_VERIFIED
    )
  }

  const role = await Role.findOne({ name: 'user' }).select('_id').lean().exec()
  if (!role) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Something went wrong'
    )
  }
  let profileImageUrl: string | null = null
  let profileImagePublicId: string | null = null
  if (profileImageFile) {
    const uploadImageResult = await streamUpload(
      profileImageFile.buffer,
      'avatar'
    )
    profileImageUrl = uploadImageResult.secure_url
    profileImagePublicId = uploadImageResult.public_id
  }
  const salt = bcrypt.genSaltSync(10)
  const passwordHashed = bcrypt.hashSync(password, salt)
  const otpHashed = crypto.createHash('sha256').update(otp).digest('hex')
  const emailOtpExpiredAt = new Date(Date.now() + 5 * 60 * 1000)
  const createdUser = await User.create({
    profile: {
      name,
      profileImageUrl,
      profileImagePublicId
    },
    email: {
      value: email
    },
    password: passwordHashed,

    providers: ['local'],
    externalIds: {},
    roleId: role._id,
    emailOtpHash: otpHashed,
    emailOtpExpiredAt
  })

  //send email
  await sendVerificationOtpEmail(
    createdUser.profile.name,
    createdUser.email.value,
    otp
  )
  const pickedUser = pickUser(createdUser)
  return pickedUser
}

export default registerService
