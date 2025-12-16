import { model, Schema } from 'mongoose'

export interface IPermission {
  name: string
  description: string
}

const permissionSchema = new Schema<IPermission>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

export default model<IPermission>('Permission', permissionSchema)
