/**
 * Node modules
 */

import * as express from 'express'
import { JwtPayload } from 'jsonwebtoken'

/**
 * Types
 */

import { Types } from 'mongoose'

declare global {
  namespace Express {
    interface Request {
      jwtVerified: {
        id: string
        roleId: string
      } & JwtPayload
    }
  }
}
