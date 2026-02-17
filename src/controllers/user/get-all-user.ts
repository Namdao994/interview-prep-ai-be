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
    const pageQuery = req.query.page as string
    const { limit, page, totalUsers, users } = await getAllUserService(
      limitQuery,
      pageQuery
    )
    res.status(StatusCodes.OK).json({
      message: 'Get all user successfully',
      pagination: {
        limit,
        page,
        total: totalUsers
      },
      data: users
    })
  } catch (error) {
    next(error)
  }
}

export default getAllUserController
