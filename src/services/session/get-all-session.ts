import env from '@configs/env'
import { SESSION_SEARCH_FIELDS } from '@constants/session'
import Question from '@models/Question'
import Session from '@models/Session'

const getAllSessionService = async (
  limitQuery: string,
  pageQuery: string,
  keywordQuery: string,
  statusQuery: string
) => {
  const limit = parseInt(limitQuery || env.DEFAULT_LIMIT_QUERY)
  const page = parseInt(pageQuery || env.DEFAULT_PAGE_QUERY)

  let filter: any = {}
  if (keywordQuery) {
    filter.$or = SESSION_SEARCH_FIELDS.map((field) => ({
      [field]: { $regex: keywordQuery, $options: 'i' }
    }))
  }
  //Status
  if (statusQuery) {
    const status = statusQuery.split(',')
    if (status.length > 0) {
      filter.lifecycleStatus = { $in: status }
    }
  }
  const offset = (page - 1) * limit
  const [totalSession, sessions] = await Promise.all([
    Session.countDocuments(filter),
    Session.find(filter).select('-__v').limit(limit).skip(offset).lean().exec()
  ])

  const sessionIds = sessions.map((s) => s._id)

  const counts = await Question.aggregate([
    { $match: { sessionId: { $in: sessionIds } } },
    { $group: { _id: '$sessionId', count: { $sum: 1 } } }
  ])

  const countMap = new Map(counts.map((c) => [c._id.toString(), c.count]))

  const sessionsWithCountQuestion = sessions.map((s) => ({
    ...s,
    questionCount: countMap.get(s._id.toString()) ?? 0
  }))

  return {
    limit,
    page,
    totalSession,
    sessionsWithCountQuestion
  }
}

export default getAllSessionService
