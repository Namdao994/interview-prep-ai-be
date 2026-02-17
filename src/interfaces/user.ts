import { Types } from 'mongoose'

export interface IUser {
  externalIds: {
    google?: string
    discord?: string
    github?: string
  }
  providers: string[]
  email: {
    value: string
    verified: boolean
  }
  profile: {
    name: string
    profileImageUrl: string | null
    profileImagePublicId: string | null
  }
  password: string
  roleId: Types.ObjectId
  emailOtpHash: string | null
  emailOtpExpiredAt: Date | null
}
