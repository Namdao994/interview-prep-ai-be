import Session from '@models/Session'
import ApiError from '@utils/api-error'
import { PickedSession, pickSession } from '@utils/pickers'
import { StatusCodes } from 'http-status-codes'
import { Types } from 'mongoose'

const getSessionByIdService = async (
  sessionId: string,
  userId: string
): Promise<PickedSession> => {
  if (!Types.ObjectId.isValid(sessionId) || !Types.ObjectId.isValid(userId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid id')
  }

  const session = await Session.findOne({
    _id: sessionId,
    userId
  })
    .select('-__v')
    .populate({
      path: 'questions',
      select: '-sessionId -__v',
      options: { sort: { createdAt: -1 } }
    })
    .lean()
    .exec()

  if (!session) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Session not found')
  }

  return pickSession(session)
}

export default getSessionByIdService
