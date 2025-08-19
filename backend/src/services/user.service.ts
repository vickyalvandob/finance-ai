import UserModel from "../models/user.model"

export const findByUserService = async(userId: string) => {
  const user = await UserModel.findById(userId);
  return user?.omitPassword();
}