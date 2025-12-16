import { model, Schema, Types } from 'mongoose'

export interface IRole {
  name: string
  description: string
  permissions: Types.ObjectId[]
  inherits: Types.ObjectId[]
  resolvedPermissions: Types.ObjectId[]
}

const roleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String
    },
    permissions: [{ type: Types.ObjectId, ref: 'Permission' }],
    inherits: [{ type: Types.ObjectId, ref: 'Role' }],
    resolvedPermissions: [{ type: Types.ObjectId, ref: 'Permission' }]
  },
  {
    timestamps: true
  }
)

export default model<IRole>('Role', roleSchema)
