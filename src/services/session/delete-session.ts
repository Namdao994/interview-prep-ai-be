import Session from '@models/Session'
import ApiError from '@utils/api-error'
import { StatusCodes } from 'http-status-codes'

const deleteSessionService = async (
  sessionId: string,
  userId: string
): Promise<void> => {
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
