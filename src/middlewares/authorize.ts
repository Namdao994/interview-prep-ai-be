import Role from '@models/Role'
import ApiError from '@utils/api-error'
import type { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
const authorizeMiddleware = (permissions: string[] = []) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (permissions.length === 0) {
        throw new ApiError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          'Permissions must be specified'
        )
      }
      const { roleId } = req.jwtVerified
      const role = await Role.findById(roleId)
        .populate({
          path: 'resolvedPermissions',
          select: '-_id name'
        })
        .lean<{ resolvedPermissions: { name: string }[] }>()
      if (!role) {
        throw new ApiError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          'Something went wrong'
        )
      }
      const resolvedPermissions = role.resolvedPermissions.map(
        (permission) => permission.name
      )
      const permissionSet = new Set(resolvedPermissions)
      const hasPermission = permissions.some((p) => permissionSet.has(p))
      if (!hasPermission) {
        throw new ApiError(
          StatusCodes.FORBIDDEN,
          'Access denied, insufficient permission'
        )
      }
      next()
    } catch (error) {
      next(error)
    }
  }
}

export default authorizeMiddleware
