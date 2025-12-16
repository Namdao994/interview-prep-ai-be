import { Strategy as DiscordStrategy } from 'passport-discord'
export const getDiscordAvatar = (profile: DiscordStrategy.Profile): string => {
  if (!profile.avatar) {
    return `https://cdn.discordapp.com/embed/avatars/${Number(profile.discriminator) % 5}.png`
  }

  const ext = profile.avatar.startsWith('a_') ? 'gif' : 'png'

  return `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${ext}`
}
