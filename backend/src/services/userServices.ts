import User from '../models/userModel';

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};
