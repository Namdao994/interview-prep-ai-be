import User from '@models/User'
import ApiError from '@utils/api-error'
import { StatusCodes } from 'http-status-codes'

const deleteMyAccountService = async (
  userId: string,
  confirmationText: string
) => {
  const user = await User.findById(userId)

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
  }

  const expectedConfirmation = `${user.profile.name}/${user.email.value}`

  if (confirmationText !== expectedConfirmation) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Confirmation text does not match'
    )
  }

  await user.deleteOne()
}

export default deleteMyAccountService
