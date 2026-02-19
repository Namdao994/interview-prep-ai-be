import changeAvatarController from '@controllers/user/change-avatar'
import deleteAvatarController from '@controllers/user/delete-avatar'
import deleteMyAccountController from '@controllers/user/delete-my-account'
import deleteUserByIdController from '@controllers/user/delete-user-by-id'
import getAllUserController from '@controllers/user/get-all-user'
import updateUserController from '@controllers/user/update-user'
import uploadImageMiddleware from '@middlewares/upload-image'
import deleteMyAccountValidation from '@validations/user/delete-my-account'
// import authorizeMiddleware from '@middlewares/authorize'
import deleteUserByIdValidation from '@validations/user/delete-user-by-id'
import updateUserValidation from '@validations/user/update-user'
import { Router } from 'express'

const router = Router()

router.get(
  '/',
  // authorizeMiddleware(['get_all_user']),
  getAllUserController
)

router.delete('/:id/delete', deleteUserByIdValidation, deleteUserByIdController)

router.delete('/delete', deleteMyAccountValidation, deleteMyAccountController)

router.patch('/update', updateUserValidation, updateUserController)

router.patch(
  '/change-avatar',
  uploadImageMiddleware.single('profileImageFile'),
  changeAvatarController
)

router.delete('/delete-avatar', deleteAvatarController)

export default router
