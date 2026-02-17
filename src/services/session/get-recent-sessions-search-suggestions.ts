import Session from '@models/Session'

const getRecentSessionsSearchSuggestionsService = async (userId: string) => {
  const recentSessions = await Session.find({ userId })
    .sort({ createdAt: -1 })
    .limit(3)
    .select('targetRole topicsToFocus -_id')
    .lean()

  return recentSessions
}

export default getRecentSessionsSearchSuggestionsService
