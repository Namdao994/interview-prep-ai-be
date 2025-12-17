import Session from '@models/Session'
import ApiError from '@utils/api-error'
import { StatusCodes } from 'http-status-codes'
import { Types } from 'mongoose'

const deleteSessionService = async (
  sessionId: string,
  userId: string
): Promise<void> => {
  if (!Types.ObjectId.isValid(sessionId) || !Types.ObjectId.isValid(userId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid id')
  }
  const deletedSession = await Session.findOneAndDelete({
    _id: sessionId,
    userId
  })
    .lean()
    .exec()
  if (!deletedSession) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Session not found')
  }
}

export default deleteSessionService
