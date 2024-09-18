// userService ansvarar för affärslogik och databasoperationer
// relaterade till användarhantering.

import User from "../models/userModel";
import bcrypt from "bcrypt";

export const createUser = async (
  name: string,
  email: string,
  password: string,
  roles: string
) => {
  // hasha lösenord
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ name, email, password: hashedPassword, roles });
  return await newUser.save();
};

// hämta alla users
export const getAllUsers = async () => {
  return await User.find().select("-password");
};

// uppdatera user
export const updateUser = async (
  id: string,
  name: string,
  email: string,
  roles: string
) => {
  return await User.findOneAndUpdate(
    { _id: id },
    { name, email, roles },
    { new: true }
  );
};

// uppdatera bara lösenord för user
export const updateUserPassword = async (id: string, newPassword: string) => {
    try {
        const user = await User.findById(id);

        if (!user) {
            throw new Error('User not found');
        }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            //uppdatera lösen i databasen
            const updatedUser = await User.findByIdAndUpdate(
            id,
            { password: hashedPassword },
            { new: true }
          );

          return updatedUser;
        } catch (error: any) {
        throw new Error(`Error updating password: ${error.message}`);
    }
};

// delete user
export const deleteUser = async (id: string) => {
  return await User.findByIdAndDelete(id);
};

// hitta user mha email
export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

// hitta user mha name
export const findUserByName = async (name: string) => {
  return await User.findOne({ name });
};
