import User from "../models/UserModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface JwtPayload {
  id: string;
}

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }

    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error("User not found");
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    console.log("Lösenord har återställts framgångsrikt");
    return { message: "Password has been reset successfully" };
  } catch (error: any) {
    throw new Error(`Error resetting password: ${error.message}`);
  }
};
