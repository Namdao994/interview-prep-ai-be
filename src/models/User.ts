/**
 * Node modules
 */
import { model, Schema, Types } from 'mongoose'

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
    profileImageUrl: string
  }
  password: string
  roleId: Types.ObjectId
}
/**
 * User Schema
 */

const userSchema = new Schema<IUser>(
  {
    externalIds: {
      google: {
        type: String
      },
      discord: {
        type: String
      },
      github: {
        type: String
      }
    },
    providers: {
      type: [String],
      enum: {
        values: ['local', 'google', 'discord', 'github'],
        message: '{VALUE} is not supported'
      }
    },
    email: {
      value: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Email is invalid']
      },
      verified: {
        type: Boolean
      }
    },
    profile: {
      name: {
        type: String,
        minLength: [3, 'Username must be at least 3 characters'],
        maxLength: [32, 'Username must be less than 32 characters']
      },
      profileImageUrl: {
        type: String,
        default: null
      }
    },
    roleId: {
      type: Types.ObjectId,
      required: [true, 'roleId is required'],
      ref: 'Role'
    },
    password: {
      type: String,
      trim: true,
      select: false,
      default: null
    }
  },
  {
    timestamps: true
  }
)

export default model<IUser>('User', userSchema)
