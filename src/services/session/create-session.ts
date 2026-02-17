import Session from '@models/Session'
import { pickSession } from '@utils/pickers'
import type { PickedSession } from '@interfaces/session'

export type SessionBody = {
  targetRole: string
  experience: number
  topicsToFocus: string
  description: string
}
const createSessionService = async (
  sessionBody: SessionBody,
  userId: string
): Promise<PickedSession> => {
  const { targetRole, topicsToFocus, experience, description } = sessionBody
  const createdSession = await Session.create({
    userId,
    targetRole,
    topicsToFocus,
    experience: Number(experience),
    description
  })
  return pickSession(createdSession.toObject())
}

export default createSessionService
