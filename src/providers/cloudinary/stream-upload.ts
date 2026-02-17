import env from '@configs/env'
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse
} from 'cloudinary'
import streamifier from 'streamifier'

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET
})

const streamUpload = (
  fileBuffer: Buffer,
  folderName: string
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: `${env.APP_NAME}/${folderName}` },
      (error?: UploadApiErrorResponse, result?: UploadApiResponse) => {
        if (error) {
          reject(error)
        } else if (result) {
          resolve(result)
        }
      }
    )

    streamifier.createReadStream(fileBuffer).pipe(stream)
  })
}

export default streamUpload
