import User from '@models/User'
import deleteFile from '@providers/cloudinary/delete-file'
import ApiError from '@utils/api-error'
import { StatusCodes } from 'http-status-codes'

const deleteAvatarService = async (userId: string) => {
  const user = await User.findById(userId)

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
  }
  let profileImageUrl = user.profile.profileImageUrl
  let profileImagePublicId = user.profile.profileImagePublicId

  if (profileImagePublicId) {
    await deleteFile(profileImagePublicId)
    profileImageUrl = null
    profileImagePublicId = null
  }

  user.profile.profileImageUrl = profileImageUrl
  user.profile.profileImagePublicId = profileImagePublicId
  await user.save()
}

export default deleteAvatarService
