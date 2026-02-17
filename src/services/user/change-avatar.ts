import User from '@models/User'
import deleteFile from '@providers/cloudinary/delete-file'
import streamUpload from '@providers/cloudinary/stream-upload'
import ApiError from '@utils/api-error'
import { pickUser } from '@utils/pickers'
import { StatusCodes } from 'http-status-codes'

const changeAvatarService = async (
  userId: string,
  profileImageFile?: Express.Multer.File
) => {
  const user = await User.findById(userId)

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
  }

  if (!profileImageFile) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Profile image is required')
  }

  if (user.profile.profileImagePublicId) {
    await deleteFile(user.profile.profileImagePublicId)
  }

  // Upload avatar mới
  const uploadImageResult = await streamUpload(
    profileImageFile.buffer,
    'avatar'
  )

  user.profile.profileImageUrl = uploadImageResult.secure_url
  user.profile.profileImagePublicId = uploadImageResult.public_id

  await user.save()

  return pickUser(user)
}

export default changeAvatarService
