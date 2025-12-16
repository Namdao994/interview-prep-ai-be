import dotenv from 'dotenv'
import { StringValue } from 'ms'

dotenv.config()

const env = {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_NAME: process.env.DATABASE_NAME as string,
  MONGODB_URI: process.env.MONGODB_URI as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  ACCESS_TOKEN_LIFETIME: process.env.ACCESS_TOKEN_LIFETIME as StringValue,
  REFRESH_TOKEN_LIFETIME: process.env.REFRESH_TOKEN_LIFETIME as StringValue,
  WHITELIST_ORIGINS: [''],
  DEFAULT_LIMIT_QUERY: process.env.DEFAULT_LIMIT_QUERY as string,
  DEFAULT_OFFSET_QUERY: process.env.DEFAULT_OFFSET_QUERY as string,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID as string,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET as string,
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID as string,
  DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET as string,
  FRONTEND_URL: process.env.FRONTEND_URL as string
}

export default env
