import env from '@configs/env'
import User from '@models/User'
import { PickedUser } from '@utils/pickers'
import jwt from 'jsonwebtoken'
import { pickUser } from '@utils/pickers'
import ApiError from '@utils/api-error'
import { StatusCodes } from 'http-status-codes'
import Role from '@models/Role'
const oauth20LoginService = async (
  externalId: string,
  name: string,
  email: { value: string; verified: boolean },
  profileImageUrl: string,
  provider: string
): Promise<{
  accessToken: string
  refreshToken: string
  pickedUser: PickedUser
}> => {
  // Tìm kiếm xem có user ứng với id của provider không
  let user = await User.findOne({
    [`externalIds.${provider}`]: externalId
  })

  // nếu không thấy thì tìm kiếm với email xem, tức là đây là trường hợp người dùng đã đăng kí với login thường ý
  if (!user && email) {
    user = await User.findOne({ 'email.value': email.value })
  }
  // đây là trường hợp người mới hoàn toàn thì tạo mới người dùng
  if (!user) {
    const role = await Role.findOne({ name: 'user' })
      .select('_id')
      .lean()
      .exec()
    if (!role) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Something went wrong'
      )
    }
    user = await User.create({
      email: { value: email.value, verified: email.verified },
      externalIds: {
        [provider]: externalId
      },
      providers: [provider],
      roleId: role._id,
      profile: {
        name,
        profileImageUrl
      }
    })
    // đây là trường hợp đã có người dùng đăng nhập ở login thường
    // dùng else if vì bên trên nếu đã có người dùng login bằng local thường rồi thì kiểm tra xem mảng providers đã có link tới provider này chưa, vì ở trên nó đã ghi đè mặc định rồi, nếu dùng if thì sẽ lại kiểm tra lại chính cái provider mới tạo, suy ra không vào if dưới mà phải dung else if, nếu chưa có link và update một số thuộc tính
  } else if (!user.providers.includes(provider)) {
    user = await User.findOneAndUpdate(
      { _id: user._id },
      {
        $set: { [`externalIds.${provider}`]: externalId },
        $addToSet: { providers: provider }
      },
      { new: true }
    )
  }

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
  }

  const accessToken = jwt.sign(
    { id: user._id, roleId: user.roleId },
    env.JWT_SECRET,
    {
      expiresIn: env.ACCESS_TOKEN_LIFETIME
    }
  )
  const refreshToken = jwt.sign(
    { id: user._id, roleId: user.roleId },
    env.JWT_SECRET,
    {
      expiresIn: env.REFRESH_TOKEN_LIFETIME
    }
  )
  const pickedUser = pickUser(user)
  return {
    accessToken,
    refreshToken,
    pickedUser
  }
}

export default oauth20LoginService
