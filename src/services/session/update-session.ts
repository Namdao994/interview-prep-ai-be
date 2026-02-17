import Session from '@models/Session'
import ApiError from '@utils/api-error'
import { pickSession } from '@utils/pickers'
import { StatusCodes } from 'http-status-codes'
import type { UpdateSessionDto } from '@interfaces/session'

const updateSessionService = async (
  sessionId: string,
  payload: UpdateSessionDto
) => {
  const updatedSession = await Session.findByIdAndUpdate(
    sessionId,
    {
      $set: payload
    },
    {
      new: true,
      runValidators: true
    }
  )

  if (!updatedSession) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Session not found')
  }

  return pickSession(updatedSession)
}

export default updateSessionService
