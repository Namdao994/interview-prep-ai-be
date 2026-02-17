import { v2 as cloudinary } from 'cloudinary'

const deleteFile = async (publicId: string): Promise<void> => {
  await cloudinary.uploader.destroy(publicId)
}

export default deleteFile
