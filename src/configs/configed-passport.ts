import passport from 'passport'
import env from './env'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as GitHubStrategy } from 'passport-github2'
import { Strategy as DiscordStrategy } from 'passport-discord'
import oauth20LoginService from '@services/auth/oauth-20-login'
import { getDiscordAvatar } from '@utils/helper'
import ApiError from '@utils/api-error'
import { StatusCodes } from 'http-status-codes'
passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/v1/auth/oauth2/redirect/google',
      scope: ['profile', 'email']
    },
    async function verify(_accessToken, _refreshToken, profile, cb) {
      const email = profile.emails?.[0] as {
        value: string
        verified: boolean
      }
      const profileImageUrl = profile.photos?.[0].value as string
      const pickedProfile = await oauth20LoginService(
        profile.id,
        profile.displayName,
        email,
        profileImageUrl,
        profile.provider
      )
      return cb(null, pickedProfile)
    }
  )
)

passport.use(
  new GitHubStrategy(
    {
      clientID: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      callbackURL: '/api/v1/auth/oauth2/redirect/github',
      scope: ['user:email']
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: any,
      cb: (arg0: null, arg1: any) => any
    ) => {
      const email = profile.emails[0]
      email.verified = true
      const profileImageUrl = profile.photos[0].value
      const pickedProfile = await oauth20LoginService(
        profile.id,
        profile.username,
        email,
        profileImageUrl,
        profile.provider
      )

      return cb(null, pickedProfile)
    }
  )
)
passport.use(
  new DiscordStrategy(
    {
      clientID: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      callbackURL: '/api/v1/auth/oauth2/redirect/discord',
      scope: ['identify', 'email']
    },
    async (_accessToken, _refreshToken, profile, cb) => {
      const valueEmail = profile.email
      if (!valueEmail) {
        throw new ApiError(
          StatusCodes.FORBIDDEN,
          'Your account must be have an email'
        )
      }
      const email = { value: valueEmail, verified: true }
      const profileImageUrl = getDiscordAvatar(profile)
      const name = profile.global_name || profile.username
      const pickedProfile = await oauth20LoginService(
        profile.id,
        name,
        email,
        profileImageUrl,
        profile.provider
      )
      return cb(null, pickedProfile)
    }
  )
)
export default passport
