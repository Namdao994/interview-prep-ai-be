import env from './env'
import mongoose, { ConnectOptions } from 'mongoose'
import '@models/index'

const clientOptions: ConnectOptions = {
  dbName: env.DATABASE_NAME,
  appName: 'Interview Prep AI',
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true
  }
}

export const connectDb = async () => {
  await mongoose.connect(env.MONGODB_URI, clientOptions)
}

export const closeDb = async () => {
  await mongoose.disconnect()
}
