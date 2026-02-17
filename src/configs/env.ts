import dotenv from 'dotenv'
import { StringValue } from 'ms'

dotenv.config()

const env = {
  NODE_ENV: process.env.NODE_ENV!,
  APP_NAME: process.env.APP_NAME!,
  //
  WEBSITE_DOMAIN:
    process.env.NODE_ENV! === 'production'
      ? process.env.WEBSITE_DOMAIN_PRODUCTION!
      : process.env.WEBSITE_DOMAIN_DEVELOPMENT!,
  //
  DATABASE_NAME: process.env.DATABASE_NAME!,
  MONGODB_URI: process.env.MONGODB_URI!,
  JWT_SECRET: process.env.JWT_SECRET!,
  //
  GOOGLE_APP_PASSWORD: process.env.GOOGLE_APP_PASSWORD!,
  //Token
  ACCESS_TOKEN_LIFETIME: process.env.ACCESS_TOKEN_LIFETIME as StringValue,
  REFRESH_TOKEN_LIFETIME: process.env.REFRESH_TOKEN_LIFETIME as StringValue,
  //Cookies
  ACCESS_TOKEN_COOKIE: process.env.REFRESH_TOKEN_LIFETIME as StringValue,
  REFRESH_TOKEN_COOKIE: process.env.REFRESH_TOKEN_LIFETIME as StringValue,
  CSRF_TOKEN_COOKIE: process.env.CSRF_TOKEN_LIFETIME as StringValue,
  //
  WHITELIST_ORIGINS: [''],
  //Queries
  DEFAULT_LIMIT_QUERY: process.env.DEFAULT_LIMIT_QUERY!,
  DEFAULT_PAGE_QUERY: process.env.DEFAULT_PAGE_QUERY!,
  //
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID!,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET!,
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID!,
  DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET!,
  POE_API_KEY: process.env.POE_API_KEY!,
  BASE_URL_POE_AI_API: process.env.BASE_URL_POE_AI_API!,
  DEFAULT_NUMBER_QUESTIONS_GENERATION:
    process.env.DEFAULT_NUMBER_QUESTIONS_GENERATION!,
  //
  LIMIT_COMMON_FILE_SIZE: 10485760, // byte = 10 MB
  ALLOW_COMMON_FILE_TYPES: ['image/jpg', 'image/jpeg', 'image/png'],
  //
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!
}

export default env
