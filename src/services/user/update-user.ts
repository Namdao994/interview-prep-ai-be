import User from '@models/User'
import { pickUser } from '@utils/pickers'

const updateUserService = async (userId: string, name: string) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      profile: {
        name
      }
    },
    {
      new: true,
      runValidators: true
    }
  )
  if (!updatedUser) {
    throw new Error('User not found')
  }
  return pickUser(updatedUser)
}

export default updateUserService
