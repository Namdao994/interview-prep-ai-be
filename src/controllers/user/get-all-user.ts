import getAllUserService from '@services/user/get-all-user'
import type { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
const getAllUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const limitQuery = req.query.limit as string
    const offsetQuery = req.query.offset as string
    const { limit, offset, totalUsers, users } = await getAllUserService(
      limitQuery,
      offsetQuery
    )
    res.status(StatusCodes.OK).json({
      message: 'Get all user successfully',
      pagination: {
        limit,
        offset,
        total: totalUsers
      },
      data: users
    })
  } catch (error) {
    next(error)
  }
}

export default getAllUserController
