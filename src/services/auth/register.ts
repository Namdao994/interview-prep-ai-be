import Role from '@models/Role'
import User from '@models/User'
import ApiError from '@utils/api-error'
import { PickedUser, pickUser } from '@utils/pickers'
import bcrypt from 'bcryptjs'
import { StatusCodes } from 'http-status-codes'

const registerService = async (
  name: string,
  email: string,
  password: string
): Promise<PickedUser> => {
  const user = await User.findOne({ 'email.value': email })
    .select('email')
    .lean()
    .exec()
  if (user) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Email is exist')
  }

  const role = await Role.findOne({ name: 'user' }).select('_id').lean().exec()
  if (!role) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Something went wrong'
    )
  }
  const salt = bcrypt.genSaltSync(10)
  const passwordHashed = bcrypt.hashSync(password, salt)
  const createdUser = await User.create({
    profile: {
      name
    },
    email: {
      value: email
    },
    password: passwordHashed,
    providers: ['local'],
    externalIds: {},
    roleId: role._id
  })
  const pickedUser = pickUser(createdUser)
  return pickedUser
}

export default registerService
