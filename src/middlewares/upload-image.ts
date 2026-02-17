import env from '@configs/env'
import multer, { FileFilterCallback } from 'multer'
import type { Request } from 'express'
import ApiError from '@utils/api-error'
import { StatusCodes } from 'http-status-codes'
const customFileFilter = (
  _req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  if (!env.ALLOW_COMMON_FILE_TYPES.includes(file.mimetype)) {
    const errMessage = 'File type is invalid. Only accept jpg, jpeg and png'
    return callback(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errMessage))
  }
  // Nếu như kiểu file hợp lệ
  callback(null, true)
}

const uploadImageMiddleware = multer({
  limits: { fileSize: env.LIMIT_COMMON_FILE_SIZE },
  fileFilter: customFileFilter
})

export default uploadImageMiddleware
